export interface IPlayerStatisticsLoader {
	areStatisticsLoadedForPlayer(player: Player): boolean;
	waitForStatisticsToLoadForPlayer(player: Player): void;
}
