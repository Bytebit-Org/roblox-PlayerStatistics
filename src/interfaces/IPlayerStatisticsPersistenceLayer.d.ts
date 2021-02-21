import { StatisticsDefinition } from "types/StatisticsDefinition";
import { StatisticsSnapshot } from "types/StatisticsSnapshot";

export interface IPlayerStatisticsPersistenceLayer<T extends StatisticsDefinition> {
	loadStatisticsSnapshotForPlayerAsync(player: Player): Promise<Partial<StatisticsSnapshot<T>> | undefined>;
	saveStatisticsSnapshotForPlayerAsync(player: Player, statisticsSnapshot: StatisticsSnapshot<T>): Promise<void>;
}
