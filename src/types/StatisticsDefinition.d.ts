import { StatisticDescription } from "./StatisticDescription";

/**
 * Defines a list of statistics, keyed by their string name
 */
export type StatisticsDefinition = {
	readonly [key: string]: StatisticDescription;
};
