/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-test-generator in @fluidframework/build-tools.
 */
import * as old from "@fluidframework/protocol-base-previous";
import * as current from "../../index";

type TypeOnly<T> = {
    [P in keyof T]: TypeOnly<T[P]>;
};

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_AttachmentTreeEntry": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_AttachmentTreeEntry():
    TypeOnly<old.AttachmentTreeEntry>;
declare function use_current_ClassDeclaration_AttachmentTreeEntry(
    use: TypeOnly<current.AttachmentTreeEntry>);
use_current_ClassDeclaration_AttachmentTreeEntry(
    get_old_ClassDeclaration_AttachmentTreeEntry());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_AttachmentTreeEntry": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_AttachmentTreeEntry():
    TypeOnly<current.AttachmentTreeEntry>;
declare function use_old_ClassDeclaration_AttachmentTreeEntry(
    use: TypeOnly<old.AttachmentTreeEntry>);
use_old_ClassDeclaration_AttachmentTreeEntry(
    get_current_ClassDeclaration_AttachmentTreeEntry());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_BlobTreeEntry": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_BlobTreeEntry():
    TypeOnly<old.BlobTreeEntry>;
declare function use_current_ClassDeclaration_BlobTreeEntry(
    use: TypeOnly<current.BlobTreeEntry>);
use_current_ClassDeclaration_BlobTreeEntry(
    get_old_ClassDeclaration_BlobTreeEntry());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_BlobTreeEntry": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_BlobTreeEntry():
    TypeOnly<current.BlobTreeEntry>;
declare function use_old_ClassDeclaration_BlobTreeEntry(
    use: TypeOnly<old.BlobTreeEntry>);
use_old_ClassDeclaration_BlobTreeEntry(
    get_current_ClassDeclaration_BlobTreeEntry());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ILocalSequencedClient": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ILocalSequencedClient():
    TypeOnly<old.ILocalSequencedClient>;
declare function use_current_InterfaceDeclaration_ILocalSequencedClient(
    use: TypeOnly<current.ILocalSequencedClient>);
use_current_InterfaceDeclaration_ILocalSequencedClient(
    get_old_InterfaceDeclaration_ILocalSequencedClient());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ILocalSequencedClient": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ILocalSequencedClient():
    TypeOnly<current.ILocalSequencedClient>;
declare function use_old_InterfaceDeclaration_ILocalSequencedClient(
    use: TypeOnly<old.ILocalSequencedClient>);
use_old_InterfaceDeclaration_ILocalSequencedClient(
    get_current_InterfaceDeclaration_ILocalSequencedClient());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IProtocolHandler": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IProtocolHandler():
    TypeOnly<old.IProtocolHandler>;
declare function use_current_InterfaceDeclaration_IProtocolHandler(
    use: TypeOnly<current.IProtocolHandler>);
use_current_InterfaceDeclaration_IProtocolHandler(
    get_old_InterfaceDeclaration_IProtocolHandler());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IProtocolHandler": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IProtocolHandler():
    TypeOnly<current.IProtocolHandler>;
declare function use_old_InterfaceDeclaration_IProtocolHandler(
    use: TypeOnly<old.IProtocolHandler>);
use_old_InterfaceDeclaration_IProtocolHandler(
    get_current_InterfaceDeclaration_IProtocolHandler());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IQuorumSnapshot": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IQuorumSnapshot():
    TypeOnly<old.IQuorumSnapshot>;
declare function use_current_InterfaceDeclaration_IQuorumSnapshot(
    use: TypeOnly<current.IQuorumSnapshot>);
use_current_InterfaceDeclaration_IQuorumSnapshot(
    get_old_InterfaceDeclaration_IQuorumSnapshot());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IQuorumSnapshot": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IQuorumSnapshot():
    TypeOnly<current.IQuorumSnapshot>;
declare function use_old_InterfaceDeclaration_IQuorumSnapshot(
    use: TypeOnly<old.IQuorumSnapshot>);
use_old_InterfaceDeclaration_IQuorumSnapshot(
    get_current_InterfaceDeclaration_IQuorumSnapshot());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IScribeProtocolState": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IScribeProtocolState():
    TypeOnly<old.IScribeProtocolState>;
declare function use_current_InterfaceDeclaration_IScribeProtocolState(
    use: TypeOnly<current.IScribeProtocolState>);
use_current_InterfaceDeclaration_IScribeProtocolState(
    get_old_InterfaceDeclaration_IScribeProtocolState());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IScribeProtocolState": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IScribeProtocolState():
    TypeOnly<current.IScribeProtocolState>;
declare function use_old_InterfaceDeclaration_IScribeProtocolState(
    use: TypeOnly<old.IScribeProtocolState>);
use_old_InterfaceDeclaration_IScribeProtocolState(
    get_current_InterfaceDeclaration_IScribeProtocolState());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_ProtocolOpHandler": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_ProtocolOpHandler():
    TypeOnly<old.ProtocolOpHandler>;
declare function use_current_ClassDeclaration_ProtocolOpHandler(
    use: TypeOnly<current.ProtocolOpHandler>);
use_current_ClassDeclaration_ProtocolOpHandler(
    get_old_ClassDeclaration_ProtocolOpHandler());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_ProtocolOpHandler": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_ProtocolOpHandler():
    TypeOnly<current.ProtocolOpHandler>;
declare function use_old_ClassDeclaration_ProtocolOpHandler(
    use: TypeOnly<old.ProtocolOpHandler>);
use_old_ClassDeclaration_ProtocolOpHandler(
    // @ts-expect-error compatibility expected to be broken
    get_current_ClassDeclaration_ProtocolOpHandler());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_Quorum": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_Quorum():
    TypeOnly<old.Quorum>;
declare function use_current_ClassDeclaration_Quorum(
    use: TypeOnly<current.Quorum>);
use_current_ClassDeclaration_Quorum(
    get_old_ClassDeclaration_Quorum());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_Quorum": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_Quorum():
    TypeOnly<current.Quorum>;
declare function use_old_ClassDeclaration_Quorum(
    use: TypeOnly<old.Quorum>);
use_old_ClassDeclaration_Quorum(
    get_current_ClassDeclaration_Quorum());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_QuorumClients": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_QuorumClients():
    TypeOnly<old.QuorumClients>;
declare function use_current_ClassDeclaration_QuorumClients(
    use: TypeOnly<current.QuorumClients>);
use_current_ClassDeclaration_QuorumClients(
    get_old_ClassDeclaration_QuorumClients());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_QuorumClients": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_QuorumClients():
    TypeOnly<current.QuorumClients>;
declare function use_old_ClassDeclaration_QuorumClients(
    use: TypeOnly<old.QuorumClients>);
use_old_ClassDeclaration_QuorumClients(
    get_current_ClassDeclaration_QuorumClients());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_QuorumClientsSnapshot": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_QuorumClientsSnapshot():
    TypeOnly<old.QuorumClientsSnapshot>;
declare function use_current_TypeAliasDeclaration_QuorumClientsSnapshot(
    use: TypeOnly<current.QuorumClientsSnapshot>);
use_current_TypeAliasDeclaration_QuorumClientsSnapshot(
    get_old_TypeAliasDeclaration_QuorumClientsSnapshot());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_QuorumClientsSnapshot": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_QuorumClientsSnapshot():
    TypeOnly<current.QuorumClientsSnapshot>;
declare function use_old_TypeAliasDeclaration_QuorumClientsSnapshot(
    use: TypeOnly<old.QuorumClientsSnapshot>);
use_old_TypeAliasDeclaration_QuorumClientsSnapshot(
    get_current_TypeAliasDeclaration_QuorumClientsSnapshot());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_QuorumProposals": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_QuorumProposals():
    TypeOnly<old.QuorumProposals>;
declare function use_current_ClassDeclaration_QuorumProposals(
    use: TypeOnly<current.QuorumProposals>);
use_current_ClassDeclaration_QuorumProposals(
    get_old_ClassDeclaration_QuorumProposals());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_QuorumProposals": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_QuorumProposals():
    TypeOnly<current.QuorumProposals>;
declare function use_old_ClassDeclaration_QuorumProposals(
    use: TypeOnly<old.QuorumProposals>);
use_old_ClassDeclaration_QuorumProposals(
    get_current_ClassDeclaration_QuorumProposals());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_QuorumProposalsSnapshot": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_QuorumProposalsSnapshot():
    TypeOnly<old.QuorumProposalsSnapshot>;
declare function use_current_TypeAliasDeclaration_QuorumProposalsSnapshot(
    use: TypeOnly<current.QuorumProposalsSnapshot>);
use_current_TypeAliasDeclaration_QuorumProposalsSnapshot(
    get_old_TypeAliasDeclaration_QuorumProposalsSnapshot());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_QuorumProposalsSnapshot": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_QuorumProposalsSnapshot():
    TypeOnly<current.QuorumProposalsSnapshot>;
declare function use_old_TypeAliasDeclaration_QuorumProposalsSnapshot(
    use: TypeOnly<old.QuorumProposalsSnapshot>);
use_old_TypeAliasDeclaration_QuorumProposalsSnapshot(
    get_current_TypeAliasDeclaration_QuorumProposalsSnapshot());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_TreeTreeEntry": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_TreeTreeEntry():
    TypeOnly<old.TreeTreeEntry>;
declare function use_current_ClassDeclaration_TreeTreeEntry(
    use: TypeOnly<current.TreeTreeEntry>);
use_current_ClassDeclaration_TreeTreeEntry(
    get_old_ClassDeclaration_TreeTreeEntry());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_TreeTreeEntry": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_TreeTreeEntry():
    TypeOnly<current.TreeTreeEntry>;
declare function use_old_ClassDeclaration_TreeTreeEntry(
    use: TypeOnly<old.TreeTreeEntry>);
use_old_ClassDeclaration_TreeTreeEntry(
    get_current_ClassDeclaration_TreeTreeEntry());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_addBlobToTree": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_addBlobToTree():
    TypeOnly<typeof old.addBlobToTree>;
declare function use_current_FunctionDeclaration_addBlobToTree(
    use: TypeOnly<typeof current.addBlobToTree>);
use_current_FunctionDeclaration_addBlobToTree(
    get_old_FunctionDeclaration_addBlobToTree());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_addBlobToTree": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_addBlobToTree():
    TypeOnly<typeof current.addBlobToTree>;
declare function use_old_FunctionDeclaration_addBlobToTree(
    use: TypeOnly<typeof old.addBlobToTree>);
use_old_FunctionDeclaration_addBlobToTree(
    get_current_FunctionDeclaration_addBlobToTree());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_buildHierarchy": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_buildHierarchy():
    TypeOnly<typeof old.buildHierarchy>;
declare function use_current_FunctionDeclaration_buildHierarchy(
    use: TypeOnly<typeof current.buildHierarchy>);
use_current_FunctionDeclaration_buildHierarchy(
    get_old_FunctionDeclaration_buildHierarchy());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_buildHierarchy": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_buildHierarchy():
    TypeOnly<typeof current.buildHierarchy>;
declare function use_old_FunctionDeclaration_buildHierarchy(
    use: TypeOnly<typeof old.buildHierarchy>);
use_old_FunctionDeclaration_buildHierarchy(
    get_current_FunctionDeclaration_buildHierarchy());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_generateServiceProtocolEntries": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_generateServiceProtocolEntries():
    TypeOnly<typeof old.generateServiceProtocolEntries>;
declare function use_current_FunctionDeclaration_generateServiceProtocolEntries(
    use: TypeOnly<typeof current.generateServiceProtocolEntries>);
use_current_FunctionDeclaration_generateServiceProtocolEntries(
    get_old_FunctionDeclaration_generateServiceProtocolEntries());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_generateServiceProtocolEntries": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_generateServiceProtocolEntries():
    TypeOnly<typeof current.generateServiceProtocolEntries>;
declare function use_old_FunctionDeclaration_generateServiceProtocolEntries(
    use: TypeOnly<typeof old.generateServiceProtocolEntries>);
use_old_FunctionDeclaration_generateServiceProtocolEntries(
    get_current_FunctionDeclaration_generateServiceProtocolEntries());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_getGitMode": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_getGitMode():
    TypeOnly<typeof old.getGitMode>;
declare function use_current_FunctionDeclaration_getGitMode(
    use: TypeOnly<typeof current.getGitMode>);
use_current_FunctionDeclaration_getGitMode(
    get_old_FunctionDeclaration_getGitMode());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_getGitMode": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_getGitMode():
    TypeOnly<typeof current.getGitMode>;
declare function use_old_FunctionDeclaration_getGitMode(
    use: TypeOnly<typeof old.getGitMode>);
use_old_FunctionDeclaration_getGitMode(
    get_current_FunctionDeclaration_getGitMode());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_getGitType": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_getGitType():
    TypeOnly<typeof old.getGitType>;
declare function use_current_FunctionDeclaration_getGitType(
    use: TypeOnly<typeof current.getGitType>);
use_current_FunctionDeclaration_getGitType(
    get_old_FunctionDeclaration_getGitType());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_getGitType": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_getGitType():
    TypeOnly<typeof current.getGitType>;
declare function use_old_FunctionDeclaration_getGitType(
    use: TypeOnly<typeof old.getGitType>);
use_old_FunctionDeclaration_getGitType(
    get_current_FunctionDeclaration_getGitType());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_getQuorumTreeEntries": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_getQuorumTreeEntries():
    TypeOnly<typeof old.getQuorumTreeEntries>;
declare function use_current_FunctionDeclaration_getQuorumTreeEntries(
    use: TypeOnly<typeof current.getQuorumTreeEntries>);
use_current_FunctionDeclaration_getQuorumTreeEntries(
    get_old_FunctionDeclaration_getQuorumTreeEntries());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_getQuorumTreeEntries": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_getQuorumTreeEntries():
    TypeOnly<typeof current.getQuorumTreeEntries>;
declare function use_old_FunctionDeclaration_getQuorumTreeEntries(
    use: TypeOnly<typeof old.getQuorumTreeEntries>);
use_old_FunctionDeclaration_getQuorumTreeEntries(
    get_current_FunctionDeclaration_getQuorumTreeEntries());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_isServiceMessageType": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_isServiceMessageType():
    TypeOnly<typeof old.isServiceMessageType>;
declare function use_current_VariableDeclaration_isServiceMessageType(
    use: TypeOnly<typeof current.isServiceMessageType>);
use_current_VariableDeclaration_isServiceMessageType(
    get_old_VariableDeclaration_isServiceMessageType());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_isServiceMessageType": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_isServiceMessageType():
    TypeOnly<typeof current.isServiceMessageType>;
declare function use_old_VariableDeclaration_isServiceMessageType(
    use: TypeOnly<typeof old.isServiceMessageType>);
use_old_VariableDeclaration_isServiceMessageType(
    get_current_VariableDeclaration_isServiceMessageType());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_isSystemMessage": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_isSystemMessage():
    TypeOnly<typeof old.isSystemMessage>;
declare function use_current_FunctionDeclaration_isSystemMessage(
    use: TypeOnly<typeof current.isSystemMessage>);
use_current_FunctionDeclaration_isSystemMessage(
    get_old_FunctionDeclaration_isSystemMessage());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_isSystemMessage": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_isSystemMessage():
    TypeOnly<typeof current.isSystemMessage>;
declare function use_old_FunctionDeclaration_isSystemMessage(
    use: TypeOnly<typeof old.isSystemMessage>);
use_old_FunctionDeclaration_isSystemMessage(
    get_current_FunctionDeclaration_isSystemMessage());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_mergeAppAndProtocolTree": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_mergeAppAndProtocolTree():
    TypeOnly<typeof old.mergeAppAndProtocolTree>;
declare function use_current_FunctionDeclaration_mergeAppAndProtocolTree(
    use: TypeOnly<typeof current.mergeAppAndProtocolTree>);
use_current_FunctionDeclaration_mergeAppAndProtocolTree(
    get_old_FunctionDeclaration_mergeAppAndProtocolTree());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_mergeAppAndProtocolTree": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_mergeAppAndProtocolTree():
    TypeOnly<typeof current.mergeAppAndProtocolTree>;
declare function use_old_FunctionDeclaration_mergeAppAndProtocolTree(
    use: TypeOnly<typeof old.mergeAppAndProtocolTree>);
use_old_FunctionDeclaration_mergeAppAndProtocolTree(
    get_current_FunctionDeclaration_mergeAppAndProtocolTree());
