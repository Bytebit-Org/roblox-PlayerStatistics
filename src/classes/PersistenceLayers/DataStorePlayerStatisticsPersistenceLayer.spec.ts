/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/// <reference types="@rbxts/testez/globals" />

import fitumi from "@rbxts/fitumi";
import { a } from "@rbxts/fitumi";
import { DataStorePlayerStatisticsPersistenceLayer } from "./DataStorePlayerStatisticsPersistenceLayer";

type Mutable<T> = {
	-readonly [P in keyof T]: T[P];
};

export = () => {
	const createDataStorePlayerStatisticsPersistenceLayer = (args: Partial<{ dataStore: GlobalDataStore }>) =>
		DataStorePlayerStatisticsPersistenceLayer.create(args.dataStore ?? a.fake<GlobalDataStore>());

	const fakePlayer = a.fake<Mutable<Player>>();
	fakePlayer.UserId = 123456789;

	describe("loadStatisticsSnapshotForPlayerAsync", () => {
		it("should throw if GetAsync throws", () =>
			(async () => {
				const errorMessage = "data store failed";

				const dataStore = a.fake<GlobalDataStore>();
				a.callTo(dataStore.GetAsync as {}, dataStore, fitumi.wildcard).throws(errorMessage);

				const persistenceLayer = createDataStorePlayerStatisticsPersistenceLayer({ dataStore });
				expect(() => persistenceLayer.loadStatisticsSnapshotForPlayerAsync(fakePlayer).expect()).to.throw();
			})().expect());

		it("should return nil if GetAsync returns nil", () =>
			(async () => {
				const dataStore = a.fake<GlobalDataStore>();
				a.callTo(dataStore.GetAsync as {}, dataStore, fitumi.wildcard).returns(undefined);

				const persistenceLayer = createDataStorePlayerStatisticsPersistenceLayer({ dataStore });
				expect(() =>
					persistenceLayer.loadStatisticsSnapshotForPlayerAsync(fakePlayer).expect(),
				).never.to.be.ok();
			})().expect());

		it("should return nil if GetAsync returns a non-table value", () =>
			(async () => {
				const values = [1, true, "three"];

				for (const value of values) {
					const dataStore = a.fake<GlobalDataStore>();
					a.callTo(dataStore.GetAsync as {}, dataStore, fitumi.wildcard).returns(value);

					const persistenceLayer = createDataStorePlayerStatisticsPersistenceLayer({ dataStore });
					expect(() =>
						persistenceLayer.loadStatisticsSnapshotForPlayerAsync(fakePlayer).expect(),
					).never.to.be.ok();
				}
			})().expect());

		it("should return the same table that GetAsync returns", () =>
			(async () => {
				const dataStoreFetchResult = {};

				const dataStore = a.fake<GlobalDataStore>();
				a.callTo(dataStore.GetAsync as {}, dataStore, fitumi.wildcard).returns(dataStoreFetchResult);

				const persistenceLayer = createDataStorePlayerStatisticsPersistenceLayer({ dataStore });
				expect(() => persistenceLayer.loadStatisticsSnapshotForPlayerAsync(fakePlayer).expect()).to.equal(
					dataStoreFetchResult,
				);
			})().expect());
	});
};
