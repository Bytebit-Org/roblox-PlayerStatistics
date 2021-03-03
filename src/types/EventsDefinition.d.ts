import { StatisticsDefinition } from "./StatisticsDefinition";

/**
 * Defines a list of events, keyed by their string name, and which statistics should be updated when the event is recorded
 */
export type EventsDefinition<T extends StatisticsDefinition> = {
	readonly [key: string]: ReadonlyArray<keyof T>;
};
