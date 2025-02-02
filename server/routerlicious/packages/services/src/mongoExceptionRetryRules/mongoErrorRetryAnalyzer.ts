/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { Lumberjack } from "@fluidframework/server-services-telemetry";
import { DefaultExceptionRule } from "./defaultExceptionRule";
import { IMongoExceptionRetryRule } from "./IMongoExceptionRetryRule";
import { createMongoErrorRetryRuleset } from "./mongoError";
import { createMongoNetworkErrorRetryRuleset } from "./mongoNetworkError";

export class MongoErrorRetryAnalyzer {
	private static instance: MongoErrorRetryAnalyzer;
	private readonly mongoNetworkErrorRetryRuleset: IMongoExceptionRetryRule[];
	private readonly mongoErrorRetryRuleset: IMongoExceptionRetryRule[];
	private readonly defaultRule: IMongoExceptionRetryRule;

	public static getInstance(retryRuleOverride: Map<string, boolean>): MongoErrorRetryAnalyzer {
		if (!this.instance) {
			this.instance = new MongoErrorRetryAnalyzer(retryRuleOverride);
		}
		return this.instance;
	}

	private constructor(retryRuleOverride: Map<string, boolean>) {
		this.mongoNetworkErrorRetryRuleset = createMongoNetworkErrorRetryRuleset(retryRuleOverride);
		this.mongoErrorRetryRuleset = createMongoErrorRetryRuleset(retryRuleOverride);
		this.defaultRule = new DefaultExceptionRule(retryRuleOverride);
	}

	public shouldRetry(error: Error): boolean {
		const rule = this.getRetryRule(error);
		const sanitizedError = {
			name: error.name,
			message: error.message,
			stack: error.stack,
			// eslint-disable-next-line @typescript-eslint/dot-notation
			code: error["code"],
			// eslint-disable-next-line @typescript-eslint/dot-notation
			codeName: error["codeName"],
			// eslint-disable-next-line @typescript-eslint/dot-notation
			errorLabels: error["errorLabels"],
		};
		if (!rule) {
			// This should not happen.
			Lumberjack.error(
				"MongoErrorRetryAnalyzer.shouldRetry() didn't get a rule",
				undefined,
				sanitizedError,
			);
			return false;
		}
		const ruleName = rule.ruleName;
		const decision = rule.shouldRetry();
		const properties = {
			ruleName,
			decision,
		};

		Lumberjack.warning(
			`Error rule used ${rule.ruleName}, shouldRetry: ${decision}`,
			properties,
			sanitizedError,
		);
		return decision;
	}

	private getRetryRule(error: Error): IMongoExceptionRetryRule {
		if (error.name === "MongoNetworkError") {
			return this.getRetryRuleFromSet(error, this.mongoNetworkErrorRetryRuleset);
		}

		return this.getRetryRuleFromSet(error, this.mongoErrorRetryRuleset);
	}

	private getRetryRuleFromSet(
		error: any,
		ruleSet: IMongoExceptionRetryRule[],
	): IMongoExceptionRetryRule {
		return ruleSet.find((rule) => rule.match(error)) || this.defaultRule;
	}
}
