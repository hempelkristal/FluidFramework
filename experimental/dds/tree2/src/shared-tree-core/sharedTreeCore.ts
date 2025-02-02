/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { assert } from "@fluidframework/common-utils";
import {
	IChannelAttributes,
	IChannelStorageService,
	IFluidDataStoreRuntime,
} from "@fluidframework/datastore-definitions";
import { ISequencedDocumentMessage } from "@fluidframework/protocol-definitions";
import {
	ITelemetryContext,
	ISummaryTreeWithStats,
	IGarbageCollectionData,
} from "@fluidframework/runtime-definitions";
import { SummaryTreeBuilder } from "@fluidframework/runtime-utils";
import {
	IFluidSerializer,
	ISharedObjectEvents,
	SharedObject,
} from "@fluidframework/shared-object-base";
import { v4 as uuid } from "uuid";
import { IMultiFormatCodec } from "../codec";
import {
	ChangeFamily,
	Commit,
	EditManager,
	SeqNumber,
	AnchorSet,
	Delta,
	RevisionTag,
	mintRevisionTag,
	minimumPossibleSequenceNumber,
	Rebaser,
	findAncestor,
	GraphCommit,
	RepairDataStore,
	ChangeFamilyEditor,
	UndoRedoManager,
	IRepairDataStoreProvider,
	UndoRedoManagerCommitType,
	markCommits,
} from "../core";
import { brand, isJsonObject, JsonCompatibleReadOnly, TransactionResult } from "../util";
import { createEmitter, TransformEvents } from "../events";
import { isStableId } from "../id-compressor";
import { TransactionStack } from "./transactionStack";
import { SharedTreeBranch } from "./branch";
import { EditManagerSummarizer } from "./editManagerSummarizer";

/**
 * The events emitted by a {@link SharedTreeCore}
 *
 * TODO: Add/remove events
 */
export interface ISharedTreeCoreEvents {
	updated: () => void;
}

// TODO: How should the format version be determined?
const formatVersion = 0;
// TODO: Organize this to be adjacent to persisted types.
const summarizablesTreeKey = "indexes";

/**
 * Events which result from the state of the tree changing.
 * These are for internal use by the tree.
 */
export interface ChangeEvents<TChangeset> {
	/**
	 * @param change - change that was just sequenced.
	 * @param derivedFromLocal - iff provided, change was a local change (from this session)
	 * which is now sequenced (and thus no longer local).
	 */
	newSequencedChange: (change: TChangeset, derivedFromLocal?: TChangeset) => void;

	/**
	 * @param change - change that was just applied locally.
	 */
	newLocalChange: (change: TChangeset) => void;

	/**
	 * @param changeDelta - composed changeset from previous local state
	 * (state after all sequenced then local changes are accounted for) to current local state.
	 * May involve effects of a new sequenced change (including rebasing of local changes onto it),
	 * or a new local change. Called after either sequencedChange or newLocalChange.
	 */
	newLocalState: (changeDelta: Delta.Root) => void;
}

/**
 * Generic shared tree, which needs to be configured with indexes, field kinds and a history policy to be used.
 *
 * TODO: actually implement
 * TODO: is history policy a detail of what indexes are used, or is there something else to it?
 */
export class SharedTreeCore<TEditor extends ChangeFamilyEditor, TChange> extends SharedObject<
	TransformEvents<ISharedTreeCoreEvents, ISharedObjectEvents>
> {
	private readonly editManager: EditManager<TChange, ChangeFamily<TEditor, TChange>>;
	private readonly undoRedoManager: UndoRedoManager<TChange, TEditor>;
	private readonly summarizables: readonly Summarizable[];

	/**
	 * The sequence number that this instance is at.
	 * This is number is artificial in that it is made up by this instance as opposed to being provided by the runtime.
	 * Is `undefined` after (and only after) this instance is attached.
	 */
	private detachedRevision: SeqNumber | undefined = minimumPossibleSequenceNumber;

	/**
	 * Provides internal events that result from changes to the tree
	 */
	protected readonly changeEvents = createEmitter<ChangeEvents<TChange>>();

	/**
	 * Used to edit the state of the tree. Edits will be immediately applied locally to the tree.
	 * If there is no transaction currently ongoing, then the edits will be submitted to Fluid immediately as well.
	 */
	public readonly editor: TEditor;
	private readonly transactions = new TransactionStack();

	/**
	 * Used to encode and decode changes.
	 *
	 * @remarks - Since there is currently only one format, this can just be cached on the class.
	 * With more write formats active, it may make sense to keep around the "usual" format codec
	 * (the one for the current persisted configuration) and resolve codecs for different versions
	 * as necessary (e.g. an upgrade op came in, or the configuration changed within the collab window
	 * and an op needs to be interpreted which isn't written with the current configuration).
	 */
	private readonly changeCodec: IMultiFormatCodec<TChange>;

	/**
	 * @param summarizables - Summarizers for all indexes used by this tree
	 * @param changeFamily - The change family
	 * @param editManager - The edit manager
	 * @param anchors - The anchor set
	 * @param id - The id of the shared object
	 * @param runtime - The IFluidDataStoreRuntime which contains the shared object
	 * @param attributes - Attributes of the shared object
	 * @param telemetryContextPrefix - the context for any telemetry logs/errors emitted
	 */
	public constructor(
		summarizables: readonly Summarizable[],
		private readonly changeFamily: ChangeFamily<TEditor, TChange>,
		private readonly anchors: AnchorSet,
		repairDataStoreProvider: IRepairDataStoreProvider,
		// Base class arguments
		id: string,
		runtime: IFluidDataStoreRuntime,
		attributes: IChannelAttributes,
		telemetryContextPrefix: string,
	) {
		super(id, runtime, attributes, telemetryContextPrefix);

		/**
		 * A random ID that uniquely identifies this client in the collab session.
		 * This is sent alongside every op to identify which client the op originated from.
		 * This is used rather than the Fluid client ID because the Fluid client ID is not stable across reconnections.
		 */
		const localSessionId = uuid();
		this.editManager = new EditManager(changeFamily, localSessionId, anchors);
		this.undoRedoManager = new UndoRedoManager(repairDataStoreProvider, changeFamily);
		this.summarizables = [
			new EditManagerSummarizer(runtime, this.editManager),
			...summarizables,
		];
		assert(
			new Set(this.summarizables.map((e) => e.key)).size === this.summarizables.length,
			0x350 /* Index summary element keys must be unique */,
		);

		this.changeCodec = changeFamily.codecs.resolve(formatVersion);
		this.editor = this.changeFamily.buildEditor((change) => this.applyChange(change), anchors);
	}

	// TODO: SharedObject's merging of the two summary methods into summarizeCore is not what we want here:
	// We might want to not subclass it, or override/reimplement most of its functionality.
	protected summarizeCore(
		serializer: IFluidSerializer,
		telemetryContext?: ITelemetryContext,
	): ISummaryTreeWithStats {
		const builder = new SummaryTreeBuilder();
		const summarizableBuilder = new SummaryTreeBuilder();
		// Merge the summaries of all summarizables together under a single ISummaryTree
		for (const s of this.summarizables) {
			summarizableBuilder.addWithStats(
				s.key,
				s.getAttachSummary(
					(contents) => serializer.stringify(contents, this.handle),
					undefined,
					undefined,
					telemetryContext,
				),
			);
		}

		builder.addWithStats(summarizablesTreeKey, summarizableBuilder.getSummaryTree());
		return builder.getSummaryTree();
	}

	protected async loadCore(services: IChannelStorageService): Promise<void> {
		const loadSummaries = this.summarizables.map(async (summaryElement) =>
			summaryElement.load(
				scopeStorageService(services, summarizablesTreeKey, summaryElement.key),
				(contents) => this.serializer.parse(contents),
			),
		);

		await Promise.all(loadSummaries);
	}

	private submitCommit(
		commit: Commit<TChange>,
		isUndoRedoCommit?: UndoRedoManagerCommitType,
		skipUndoRedoManagerTracking = false,
	): void {
		// Nested transactions are tracked as part of the outermost transaction
		if (!this.isTransacting() && !skipUndoRedoManagerTracking) {
			this.undoRedoManager.trackCommit(commit, isUndoRedoCommit);
		}

		// Edits submitted before the first attach are treated as sequenced because they will be included
		// in the attach summary that is uploaded to the service.
		// Until this attach workflow happens, this instance essentially behaves as a centralized data structure.
		if (this.detachedRevision !== undefined) {
			const newRevision: SeqNumber = brand((this.detachedRevision as number) + 1);
			this.detachedRevision = newRevision;
			this.editManager.addSequencedChange(commit, newRevision, this.detachedRevision);
		}
		const message: Message = {
			revision: commit.revision,
			originatorId: this.editManager.localSessionId,
			changeset: this.changeCodec.json.encode(commit.change),
		};
		this.submitLocalMessage(message);
	}

	/**
	 * Update the state of the tree (including all indexes) according to the given change.
	 * If there is not currently a transaction open, the change will be submitted to Fluid.
	 * @param change - The change to apply.
	 * @param revision - The revision to associate with the change.
	 * Defaults to a new, randomly generated, revision if not provided.
	 */
	protected applyChange(
		change: TChange,
		revision?: RevisionTag,
		undoRedoManagerCommitType?: UndoRedoManagerCommitType,
		skipUndoRedoManagerTracking?: boolean,
	): GraphCommit<TChange> {
		const [commit, delta] = this.addLocalChange(
			change,
			revision ?? mintRevisionTag(),
			undoRedoManagerCommitType,
			skipUndoRedoManagerTracking,
			false,
		);

		// submitCommit should not be called for stashed ops so this is kept separate from
		// addLocalChange
		if (!this.isTransacting()) {
			this.submitCommit(commit, undoRedoManagerCommitType, skipUndoRedoManagerTracking);
		}

		this.emitLocalChange(change, delta);
		return commit;
	}

	/**
	 * Adds the local change to the editmanager and returns the commit with the given change.
	 * @param change - The change to apply
	 * @param revision - The revision to associate with the change.
	 * @returns Commit object with the change, revision and localsessionid
	 */
	private addLocalChange(
		change: TChange,
		revision: RevisionTag,
		undoRedoManagerCommitType?: UndoRedoManagerCommitType,
		skipUndoRedoManagerTracking = false,
		shouldEmitChange = true,
	): [Commit<TChange>, Delta.Root] {
		const commit = {
			change,
			revision,
			sessionId: this.editManager.localSessionId,
		};
		const delta = this.editManager.addLocalChange(revision, change, false);
		this.transactions.repairStore?.capture(this.changeFamily.intoDelta(change), revision);

		if (shouldEmitChange) {
			// If this change should be emitted, track the commit in the undo redo manager
			// before the local change is applied
			if (!this.isTransacting() && !skipUndoRedoManagerTracking) {
				this.undoRedoManager.trackCommit(commit, undoRedoManagerCommitType);
			}
			this.emitLocalChange(change, delta);
		}

		return [commit, delta];
	}

	private emitLocalChange(change: TChange, delta: Delta.Root) {
		this.changeEvents.emit("newLocalChange", change);
		this.changeEvents.emit("newLocalState", delta);
	}

	protected processCore(
		message: ISequencedDocumentMessage,
		local: boolean,
		localOpMetadata: unknown,
	) {
		const commit = parseCommit(message.contents, this.changeCodec);

		const delta = this.editManager.addSequencedChange(
			commit,
			brand(message.sequenceNumber),
			brand(message.referenceSequenceNumber),
		);
		const sequencedChange = this.editManager.getLastSequencedChange();
		this.changeEvents.emit("newSequencedChange", sequencedChange);
		this.changeEvents.emit("newLocalState", delta);
		this.editManager.advanceMinimumSequenceNumber(brand(message.minimumSequenceNumber));
	}

	public startTransaction(repairStore?: RepairDataStore): void {
		if (!this.isTransacting()) {
			// If this is the start of a transaction stack, freeze the undo redo manager's
			// repair data store provider so that repair data can be captured based on the
			// state of the branch at the start of the transaction.
			this.undoRedoManager.repairDataStoreProvider.freeze();
		}
		this.transactions.push(this.editManager.getLocalBranchHead().revision, repairStore);
		this.editor.enterTransaction();
	}

	public commitTransaction(): TransactionResult.Commit {
		const { startRevision } = this.transactions.pop();
		this.editor.exitTransaction();
		const squashCommit = this.editManager.squashLocalChanges(startRevision);
		if (!this.isTransacting()) {
			this.submitCommit(squashCommit);
		}
		return TransactionResult.Commit;
	}

	public abortTransaction(): TransactionResult.Abort {
		const { startRevision, repairStore } = this.transactions.pop();
		this.editor.exitTransaction();
		const delta = this.editManager.rollbackLocalChanges(startRevision, repairStore);
		this.changeEvents.emit("newLocalState", delta);
		return TransactionResult.Abort;
	}

	public isTransacting(): boolean {
		return this.transactions.size !== 0;
	}

	/**
	 * Undoes the last completed transaction made by the client.
	 * It is invalid to call it while a transaction is open (this will be supported in the future).
	 */
	public undo(): void {
		// TODO: allow this once it becomes possible to compose the changesets created by edits made
		// within transactions and edits that represent completed transactions.
		assert(!this.isTransacting(), "Undo is not yet supported during transactions");

		const undoChange = this.undoRedoManager.undo();
		if (undoChange !== undefined) {
			this.applyChange(undoChange, undefined, UndoRedoManagerCommitType.Undo);
		}
	}

	/**
	 * Spawns a `SharedTreeBranch` that is based on the current state of the tree.
	 * This can be used to support asynchronous checkouts of the tree.
	 */
	protected createBranch(
		anchors: AnchorSet,
		repairDataStoreProvider: IRepairDataStoreProvider,
	): SharedTreeBranch<TEditor, TChange> {
		const branch = new SharedTreeBranch(
			this.editManager.getLocalBranchHead(),
			this.editManager.localSessionId,
			new Rebaser(this.changeFamily.rebaser),
			this.changeFamily,
			this.undoRedoManager.clone(repairDataStoreProvider),
			anchors,
		);
		return branch;
	}

	/**
	 * Merges the commits of the given branch into the root local branch.
	 * This behaves as if all divergent commits on the branch were applied to the root local branch one at a time.
	 * @param branch - the branch to merge
	 */
	protected mergeBranch(branch: SharedTreeBranch<TEditor, TChange>): void {
		assert(
			!branch.isTransacting(),
			0x5cb /* Branch may not be merged while transaction is in progress */,
		);

		const commits: GraphCommit<TChange>[] = [];
		const localBranchHead = this.editManager.getLocalBranchHead();
		const ancestor = findAncestor([branch.getHead(), commits], (c) => c === localBranchHead);
		if (ancestor === localBranchHead) {
			this.applyPathFromBranch(branch, commits);
		} else {
			const rebaser = new Rebaser(this.changeFamily.rebaser);
			const [newHead] = rebaser.rebaseBranch(branch.getHead(), this.getLocalBranchHead());
			const changes: GraphCommit<TChange>[] = [];
			findAncestor([newHead, changes], (c) => c === this.getLocalBranchHead());
			this.applyPathFromBranch(branch, changes);
		}
	}

	private applyPathFromBranch(
		branch: SharedTreeBranch<TEditor, TChange>,
		path: GraphCommit<TChange>[],
	): void {
		const markedCommits = markCommits(path, branch.undoRedoManager.headUndoable);
		for (const {
			commit: { change, revision },
			isUndoable,
		} of markedCommits) {
			// Only track commits that are undoable.
			const commitType = isUndoable ? UndoRedoManagerCommitType.Undoable : undefined;
			this.applyChange(change, revision, commitType, !isUndoable);
			this.changeFamily.rebaser.rebaseAnchors(this.anchors, change);
		}
	}

	/**
	 * @returns the head commit of the root local branch
	 */
	protected getLocalBranchHead(): GraphCommit<TChange> {
		return this.editManager.getLocalBranchHead();
	}

	protected onDisconnect() {}

	protected override didAttach(): void {
		if (this.detachedRevision !== undefined) {
			this.detachedRevision = undefined;
		}
	}

	protected override reSubmitCore(content: JsonCompatibleReadOnly, localOpMetadata: unknown) {
		const { revision } = parseCommit(content, this.changeCodec);
		const [commit] = this.editManager.findLocalCommit(revision);
		// Skip tracking commits as undoable during resubmit.
		this.submitCommit(commit, undefined, true);
	}

	protected applyStashedOp(content: JsonCompatibleReadOnly): undefined {
		const { revision, change } = parseCommit(content, this.changeCodec);
		this.addLocalChange(change, revision);
		return;
	}

	public override getGCData(fullGC?: boolean): IGarbageCollectionData {
		const gcNodes: IGarbageCollectionData["gcNodes"] = {};
		for (const s of this.summarizables) {
			for (const [id, routes] of Object.entries(s.getGCData(fullGC).gcNodes)) {
				gcNodes[id] ??= [];
				for (const route of routes) {
					gcNodes[id].push(route);
				}
			}
		}

		return {
			gcNodes,
		};
	}
}

/**
 * The format of messages that SharedTree sends and receives.
 */
interface Message {
	/**
	 * The revision tag for the change in this message
	 */
	readonly revision: RevisionTag;
	/**
	 * The stable ID that identifies the originator of the message.
	 */
	readonly originatorId: string;
	/**
	 * The changeset to be applied.
	 */
	readonly changeset: JsonCompatibleReadOnly;
}

/**
 * Specifies the behavior of a component that puts data in a summary.
 */
export interface Summarizable {
	/**
	 * Field name in summary json under which this element stores its data.
	 */
	readonly key: string;

	/**
	 * {@inheritDoc @fluidframework/datastore-definitions#(IChannel:interface).getAttachSummary}
	 * @param stringify - Serializes the contents of the component (including {@link IFluidHandle}s) for storage.
	 */
	getAttachSummary(
		stringify: SummaryElementStringifier,
		fullTree?: boolean,
		trackState?: boolean,
		telemetryContext?: ITelemetryContext,
	): ISummaryTreeWithStats;

	/**
	 * {@inheritDoc @fluidframework/datastore-definitions#(IChannel:interface).summarize}
	 * @param stringify - Serializes the contents of the component (including {@link IFluidHandle}s) for storage.
	 */
	summarize(
		stringify: SummaryElementStringifier,
		fullTree?: boolean,
		trackState?: boolean,
		telemetryContext?: ITelemetryContext,
	): Promise<ISummaryTreeWithStats>;

	/**
	 * {@inheritDoc (ISharedObject:interface).getGCData}
	 */
	// TODO: Change this interface (and the one in ISharedObject, if necessary) to support "handles within handles".
	// Consider the case of a document with history; the return value here currently grows unboundedly.
	getGCData(fullGC?: boolean): IGarbageCollectionData;

	/**
	 * Allows the component to perform custom loading. The storage service is scoped to this component and therefore
	 * paths in this component will not collide with those in other components, even if they are the same string.
	 * @param service - Storage used by the component
	 * @param parse - Parses serialized data from storage into runtime objects for the component
	 */
	load(service: IChannelStorageService, parse: SummaryElementParser): Promise<void>;
}

/**
 * Serializes the given contents into a string acceptable for storing in summaries, i.e. all
 * Fluid handles have been replaced appropriately by an IFluidSerializer
 */
export type SummaryElementStringifier = (contents: unknown) => string;

/**
 * Parses a serialized/summarized string into an object, rehydrating any Fluid handles as necessary
 */
export type SummaryElementParser = (contents: string) => unknown;

/**
 * Compose an {@link IChannelStorageService} which prefixes all paths before forwarding them to the original service
 */
function scopeStorageService(
	service: IChannelStorageService,
	...pathElements: string[]
): IChannelStorageService {
	const scope = `${pathElements.join("/")}/`;

	return {
		async readBlob(path: string): Promise<ArrayBufferLike> {
			return service.readBlob(`${scope}${path}`);
		},
		async contains(path) {
			return service.contains(`${scope}${path}`);
		},
		async list(path) {
			return service.list(`${scope}${path}`);
		},
	};
}

/**
 * validates that the message contents is an object which contains valid revisionId, sessionId, and changeset and returns a Commit
 * @param content - message contents
 * @returns a Commit object
 */
function parseCommit<TChange>(
	content: JsonCompatibleReadOnly,
	codec: IMultiFormatCodec<TChange>,
): Commit<TChange> {
	assert(isJsonObject(content), 0x5e4 /* expected content to be an object */);
	assert(
		typeof content.revision === "string" && isStableId(content.revision),
		0x5e5 /* expected revision id to be valid stable id */,
	);
	assert(content.changeset !== undefined, 0x5e7 /* expected changeset to be defined */);
	assert(typeof content.originatorId === "string", 0x5e8 /* expected changeset to be defined */);
	const change = codec.json.decode(content.changeset);
	return { revision: content.revision, sessionId: content.originatorId, change };
}
