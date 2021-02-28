import { IReadOnlySignal } from "@rbxts/signals-tooling";

export interface IPlayerStatisticsLoader {
	readonly statisticsLoadedForPlayer: IReadOnlySignal<(player: Player) => void>;

	areStatisticsLoadedForPlayer(player: Player): boolean;

	waitForStatisticsToLoadForPlayer(player: Player): void;
}
