import { StatisticsDefinition } from "./StatisticsDefinition";

export type EventsDefinition<T extends StatisticsDefinition> = {
	readonly [key: string]: ReadonlyArray<keyof T>;
};
