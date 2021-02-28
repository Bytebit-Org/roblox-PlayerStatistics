import { StatisticsDefinition } from "./StatisticsDefinition";

/**
 * Defines a list of events, keyed by their string name
 */
export type EventsDefinition<T extends StatisticsDefinition> = {
	readonly [key: string]: ReadonlyArray<keyof T>;
};
