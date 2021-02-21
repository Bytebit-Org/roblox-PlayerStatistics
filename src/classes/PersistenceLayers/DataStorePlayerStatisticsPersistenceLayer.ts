import { IPlayerStatisticsPersistenceLayer } from "interfaces/IPlayerStatisticsPersistenceLayer";
import { StatisticsDefinition } from "types/StatisticsDefinition";
import { StatisticsSnapshot } from "types/StatisticsSnapshot";

function generateKeyForPlayer(player: Player) {
	return `player_UserId:${player.UserId}`;
}

export class DataStorePlayerStatisticsPersistenceLayer<Stats extends StatisticsDefinition>
	implements IPlayerStatisticsPersistenceLayer<Stats> {
	private constructor(private readonly dataStore: GlobalDataStore) {}

	public static create(this: void, dataStore: GlobalDataStore) {
		return new DataStorePlayerStatisticsPersistenceLayer(dataStore);
	}

	public async loadStatisticsSnapshotForPlayerAsync(player: Player) {
		const dataStoreFetchResult = await Promise.promisify(() =>
			this.dataStore.GetAsync(generateKeyForPlayer(player)),
		)();

		if (dataStoreFetchResult === undefined || typeIs(dataStoreFetchResult, "table")) {
			return dataStoreFetchResult;
		}

		warn(
			`Invalid data found in data store for player ${
				player.Name
			}. Expected nil or table, got value of type "${typeOf(dataStoreFetchResult)}. Returning nil instead."`,
		);
		return undefined;
	}

	public async saveStatisticsSnapshotForPlayerAsync(player: Player, statisticsSnapshot: StatisticsSnapshot<Stats>) {
		return Promise.promisify(() => this.dataStore.SetAsync(generateKeyForPlayer(player), statisticsSnapshot))();
	}
}
