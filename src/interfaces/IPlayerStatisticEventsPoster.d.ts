import { EventsDefinition } from "../types/EventsDefinition";
import { StatisticsDefinition } from "../types/StatisticsDefinition";
import { IPlayerStatisticsLoader } from "./IPlayerStatisticsLoader";

/**
 * Provides the interface for posting player statistic events and implements {@link IPlayerStatisticsLoader}
 */
export interface IPlayerStatisticEventsPoster<
	StatsDef extends StatisticsDefinition,
	EventsDef extends EventsDefinition<StatsDef>
> extends IPlayerStatisticsLoader {
	/**
	 * Records a new statistically relevant event, updating all associated statistics
	 * @param player The player to record the event for
	 * @param eventName The name of the event - must be a key of the events definition type
	 * @param value The value of the event
	 */
	recordEvent(player: Player, eventName: keyof EventsDef, value: number): void;
}
