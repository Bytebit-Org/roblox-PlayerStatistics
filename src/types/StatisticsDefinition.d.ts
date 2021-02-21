export type StatisticsDefinition = {
	readonly [key: string]: {
		readonly defaultValue: number;
		readonly updateFunction: (eventValue: number, previousStatisticValue: number) => number;
	};
	[key: number]: never;
};
