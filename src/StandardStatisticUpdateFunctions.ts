/**
 * A set of handy, common update functions for statistics
 */
export const StandardStatisticUpdateFunctions = {
	/** Increments the statistic value by 1 */
	increment: (_: number, currentValue: number) => currentValue + 1,

	/** Keeps a constant sum of each event value in the statistic */
	sum: (a: number, b: number) => a + b,
};
