/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
<<<<<<< HEAD
/// <reference types="@rbxts/testez/global" />
=======
/// <reference types="@rbxts/testez/globals" />
>>>>>>> 500ee1497247cc90d8105f5ec617b146e142272e

import fitumi from "@rbxts/fitumi";
import { a } from "@rbxts/fitumi";
import { DataStorePlayerStatisticsPersistenceLayer } from "./DataStorePlayerStatisticsPersistenceLayer";

<<<<<<< HEAD
type Mutable<T> = {
	-readonly [P in keyof T]: T[P];
};

export = () => {
	const createDataStorePlayerStatisticsPersistenceLayer = (args: Partial<{ dataStore: GlobalDataStore }>) =>
		DataStorePlayerStatisticsPersistenceLayer.create(args.dataStore ?? a.fake<GlobalDataStore>());

	const fakePlayer = a.fake<Mutable<Player>>();
	fakePlayer.UserId = 123456789;

	describe("loadStatisticsSnapshotForPlayerAsync", () => {
		it("should throw if GetAsync throws", async () => {
			const errorMessage = "data store failed";

			const dataStore = a.fake<GlobalDataStore>();
			a.callTo(dataStore.GetAsync, fitumi.wildcard).throws(errorMessage);

			const persistenceLayer = createDataStorePlayerStatisticsPersistenceLayer({ dataStore });
			expect(() => persistenceLayer.loadStatisticsSnapshotForPlayerAsync(fakePlayer)).to.throw();
		});
=======
export = () => {
	const createDataStorePlayerStatisticsPersistenceLayer = (args: Partial<{ dataStore: GlobalDataStore }>) =>
		DataStorePlayerStatisticsPersistenceLayer.create<{}>(args.dataStore ?? a.fake<GlobalDataStore>());

	const fakePlayer = a.fake<Player>();
	fakePlayer.Name = "TestUser";
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
				expect(persistenceLayer.loadStatisticsSnapshotForPlayerAsync(fakePlayer).expect()).never.to.be.ok();
			})().expect());

		it("should return nil if GetAsync returns a non-table value", () =>
			(async () => {
				const values = [1, true, "three"];

				for (const value of values) {
					const dataStore = a.fake<GlobalDataStore>();
					a.callTo(dataStore.GetAsync as {}, dataStore, fitumi.wildcard).returns(value);

					const persistenceLayer = createDataStorePlayerStatisticsPersistenceLayer({ dataStore });
					expect(persistenceLayer.loadStatisticsSnapshotForPlayerAsync(fakePlayer).expect()).never.to.be.ok();
				}
			})().expect());

		it("should return the same table that GetAsync returns", () =>
			(async () => {
				const dataStoreFetchResult = {};

				const dataStore = a.fake<GlobalDataStore>();
				a.callTo(dataStore.GetAsync as {}, dataStore, fitumi.wildcard).returns(dataStoreFetchResult);

				const persistenceLayer = createDataStorePlayerStatisticsPersistenceLayer({ dataStore });
				expect(persistenceLayer.loadStatisticsSnapshotForPlayerAsync(fakePlayer).expect()).to.equal(
					dataStoreFetchResult,
				);
			})().expect());
	});

	describe("saveStatisticsSnapshotForPlayerAsync", () => {
		it("should throw if SetAsync throws", () =>
			(async () => {
				const statisticsSnapshot = {};
				const errorMessage = "data store failed";

				const dataStore = a.fake<GlobalDataStore>();
				a.callTo(dataStore.SetAsync as {}, dataStore, fitumi.wildcard, statisticsSnapshot).throws(errorMessage);

				const persistenceLayer = createDataStorePlayerStatisticsPersistenceLayer({ dataStore });
				expect(() =>
					persistenceLayer.saveStatisticsSnapshotForPlayerAsync(fakePlayer, statisticsSnapshot).expect(),
				).to.throw();
			})().expect());

		it("should succeed if SetAsync does not throw", () =>
			(async () => {
				const statisticsSnapshot = {};

				const dataStore = a.fake<GlobalDataStore>();

				const persistenceLayer = createDataStorePlayerStatisticsPersistenceLayer({ dataStore });
				expect(() =>
					persistenceLayer.saveStatisticsSnapshotForPlayerAsync(fakePlayer, statisticsSnapshot).expect(),
				).never.to.throw();
			})().expect());
>>>>>>> 500ee1497247cc90d8105f5ec617b146e142272e
	});
};
