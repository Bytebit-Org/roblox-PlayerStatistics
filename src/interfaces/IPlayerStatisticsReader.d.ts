import { ISignalConnection } from "@rbxts/signals-tooling";
import { StatisticsDefinition } from "types/StatisticsDefinition";
import { IPlayerStatisticsLoader } from "./IPlayerStatisticsLoader";

export interface IPlayerStatisticsReader<StatsDef extends StatisticsDefinition> extends IPlayerStatisticsLoader {
	getStatisticValueForPlayer(player: Player, statisticName: keyof StatsDef): number;

	subscribeToStatisticUpdates(
		statisticName: keyof StatsDef,
		handler: (player: Player, newValue: number, oldValue: number) => void,
	): ISignalConnection;
}
