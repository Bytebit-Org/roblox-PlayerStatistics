import { IDestroyable } from "@rbxts/dumpster";
import { EventsDefinition } from "../types/EventsDefinition";
import { StatisticsDefinition } from "../types/StatisticsDefinition";
import { IPlayerStatisticEventsPoster } from "./IPlayerStatisticEventsPoster";
import { IPlayerStatisticsReader } from "./IPlayerStatisticsReader";

/**
 * Provides an interface for a player statistics provider, which implements {@link IPlayerStatisticsLoader}, {@link IPlayerStatisticsReader}, and {@link IPlayerStatisticEventsPoster}
 */
export interface IPlayerStatisticsProvider<
	StatsDef extends StatisticsDefinition,
	EventsDef extends EventsDefinition<StatsDef>
> extends IPlayerStatisticsReader<StatsDef>,
		IPlayerStatisticEventsPoster<StatsDef, EventsDef>,
		IDestroyable {}
