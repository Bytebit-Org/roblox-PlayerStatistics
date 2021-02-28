/**
 * Defines a list of statistics, keyed by their string name
 */
export type StatisticsDefinition = {
	readonly [key: string]: {
		/** The default value to use for the statistic */
		readonly defaultValue: number;

		/** A function to update the statistic value given the value of a single event and the previous value for the statistic */
		readonly updateFunction: (eventValue: number, previousStatisticValue: number) => number;
	};
};
