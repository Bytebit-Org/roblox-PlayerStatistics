import { EventsDefinition } from "types/EventsDefinition";
import { StatisticsDefinition } from "types/StatisticsDefinition";
import { IPlayerStatisticsLoader } from "./IPlayerStatisticsLoader";

export interface IPlayerStatisticEventsPoster<
	StatsDef extends StatisticsDefinition,
	EventsDef extends EventsDefinition<StatsDef>
> extends IPlayerStatisticsLoader {
	recordEvent(player: Player, eventName: keyof EventsDef, value: number): void;
}
