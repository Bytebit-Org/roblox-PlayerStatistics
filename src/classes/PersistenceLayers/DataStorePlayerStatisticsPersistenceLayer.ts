import { IPlayerStatisticsPersistenceLayer } from "interfaces/IPlayerStatisticsPersistenceLayer";
import { StatisticsDefinition } from "types/StatisticsDefinition";
import { StatisticsSnapshot } from "types/StatisticsSnapshot";

function generateKeyForPlayer(player: Player) {
	return `player_UserId:${player.UserId}`;
}

/**
 * The standard implementation of {@link IPlayerStatisticsPersistenceLayer} which stores player statistic snapshots a DataStore
 * and overwrites the previous snapshot on each save.
 */
export class DataStorePlayerStatisticsPersistenceLayer<StatsDef extends StatisticsDefinition>
	implements IPlayerStatisticsPersistenceLayer<StatsDef> {
	/**
	 * Use the create method instead
	 */
	private constructor(private readonly dataStore: GlobalDataStore) {}

	/**
	 * Creates a new instance
	 * @param this
	 * @param dataStore The data store to use
	 */
	public static create<StatsDef extends StatisticsDefinition>(
		this: void,
		dataStore: GlobalDataStore,
	): IPlayerStatisticsPersistenceLayer<StatsDef> {
		return new DataStorePlayerStatisticsPersistenceLayer(dataStore);
	}

	public async loadStatisticsSnapshotForPlayerAsync(player: Player) {
		return await Promise.promisify(() => this.dataStore.GetAsync(generateKeyForPlayer(player)))()
			.then((dataStoreFetchResult) => {
				if (dataStoreFetchResult === undefined || typeIs(dataStoreFetchResult, "table")) {
					return dataStoreFetchResult;
				}

				warn(
					`Invalid data found in data store for player ${
						player.Name
					}. Expected nil or table, got value of type "${typeOf(
						dataStoreFetchResult,
					)}. Returning nil instead."`,
				);
				return undefined;
			})
			.catch((reason) => error(reason));
	}

	public async saveStatisticsSnapshotForPlayerAsync(
		player: Player,
		statisticsSnapshot: StatisticsSnapshot<StatsDef>,
	) {
		return Promise.promisify(() => this.dataStore.SetAsync(generateKeyForPlayer(player), statisticsSnapshot))();
	}
}
