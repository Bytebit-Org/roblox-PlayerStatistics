import { StatisticsDefinition } from "./StatisticsDefinition";

export type StatisticsSnapshot<T extends StatisticsDefinition> = {
	readonly [S in keyof T]: number;
};
