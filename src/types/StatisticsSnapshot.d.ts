import { StatisticsDefinition } from "./StatisticsDefinition";

/**
 * A snapshot of statistics for a given player as per a definition of statistics
 */
export type StatisticsSnapshot<T extends StatisticsDefinition> = {
	readonly [S in keyof T]: number;
};
