import { StatisticsDefinition } from "../types/StatisticsDefinition";
import { StatisticsSnapshot } from "../types/StatisticsSnapshot";

/**
 * Provides an interface for a persistence layer for player statistics
 * Meant to allow for consumers to implement their own persistence layer to tie in with their game's persistence system
 */
export interface IPlayerStatisticsPersistenceLayer<T extends StatisticsDefinition> {
	/**
	 * Loads a statistics snapshot for the given player. Should return undefined if default is desired.
	 * @param player The player to load the statistics snapshot for.
	 */
	loadStatisticsSnapshotForPlayerAsync(player: Player): Promise<Partial<StatisticsSnapshot<T>> | undefined>;

	/**
	 * Saves a statistics snapshot for the given player.
	 * @param player The player to save the statistics snapshot for.
	 * @param statisticsSnapshot The statistics snapshot to save.
	 */
	saveStatisticsSnapshotForPlayerAsync(player: Player, statisticsSnapshot: StatisticsSnapshot<T>): Promise<void>;
}
