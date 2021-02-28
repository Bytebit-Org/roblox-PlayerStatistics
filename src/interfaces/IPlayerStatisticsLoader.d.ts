import { IReadOnlySignal } from "@rbxts/signals-tooling";

/**
 * Provides an interface for loading player statistics
 */
export interface IPlayerStatisticsLoader {
	/** Fired when statistics are loaded for a player */
	readonly statisticsLoadedForPlayer: IReadOnlySignal<(player: Player) => void>;

	/**
	 * Returns whether statistics have been loaded for the given player
	 * @param player The given player
	 */
	areStatisticsLoadedForPlayer(player: Player): boolean;

	/**
	 * Waits (yields current coroutine) until statistics have been loaded for the given player
	 * @param player The given player
	 */
	waitForStatisticsToLoadForPlayer(player: Player): void;
}
