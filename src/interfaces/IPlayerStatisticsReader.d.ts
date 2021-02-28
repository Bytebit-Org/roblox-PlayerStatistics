import { ISignalConnection } from "@rbxts/signals-tooling";
import { StatisticsDefinition } from "types/StatisticsDefinition";
import { StatisticsSnapshot } from "types/StatisticsSnapshot";
import { IPlayerStatisticsLoader } from "./IPlayerStatisticsLoader";

/**
 * Provides the interface for reading player statistics and implements {@link IPlayerStatisticsLoader}
 */
export interface IPlayerStatisticsReader<StatsDef extends StatisticsDefinition> extends IPlayerStatisticsLoader {
	/**
	 * Gets the current statistics snapshot for the given player
	 * @param player The given player
	 */
	getStatisticsSnapshotForPlayer(player: Player): StatisticsSnapshot<StatsDef>;

	/**
	 * Gets the value of a single statistic for the given player
	 * @param player The given player
	 * @param statisticName The name of the statistic to fetch
	 */
	getStatisticValueForPlayer(player: Player, statisticName: keyof StatsDef): number;

	/**
	 * Subscribes to updates of statistics matching the given name for all players
	 * @param statisticName The name to match for the statistic
	 * @param handler The handler function
	 */
	subscribeToStatisticUpdates(
		statisticName: keyof StatsDef,
		handler: (player: Player, newValue: number, oldValue: number) => void,
	): ISignalConnection;
}
