/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/// <reference types="@rbxts/testez/globals" />

import { Dumpster } from "@rbxts/dumpster";
import fitumi from "@rbxts/fitumi";
import { a } from "@rbxts/fitumi";
import { HttpService, RunService } from "@rbxts/services";
import { ISignal } from "@rbxts/signals-tooling";
import { DumpsterFactory } from "factories/DumpsterFactory";
import { SignalFactory } from "factories/SignalFactory";
import { createFakeSignal } from "functions/UnitTesting/CreateFakeSignal";
import { IPlayerStatisticsPersistenceLayer } from "index";
import { StandardStatisticUpdateFunctions } from "StandardStatisticUpdateFunctions";
import { EventsDefinition } from "types/EventsDefinition";
import { StatisticsSnapshot } from "types/StatisticsSnapshot";
import { PlayerStatisticsProvider } from "./PlayerStatisticsProvider";

function ensureExtends<S, T extends S>(value: T): T {
	return value;
}

const statsDef = {
	increment: {
		defaultValue: 0,
		updateFunction: StandardStatisticUpdateFunctions.increment,
	},
	max: {
		defaultValue: -math.huge,
		updateFunction: math.max,
	},
	min: {
		defaultValue: math.huge,
		updateFunction: math.min,
	},
	sum: {
		defaultValue: 0,
		updateFunction: StandardStatisticUpdateFunctions.sum,
	},
};

const eventsDef = {
	updatesAll: identity<ReadonlyArray<keyof typeof statsDef>>(["increment", "max", "min", "sum"]),
	updatesNone: [],
};
ensureExtends<EventsDefinition<typeof statsDef>, typeof eventsDef>(eventsDef);

function createDefaultPersistenceLayer() {
	const persistenceLayer = a.fake<Mutable<IPlayerStatisticsPersistenceLayer<typeof statsDef>>>();

	a.callTo(persistenceLayer.loadStatisticsSnapshotForPlayerAsync as {}, persistenceLayer, fitumi.wildcard).returns(
		Promise.resolve(undefined),
	);

	a.callTo(
		persistenceLayer.saveStatisticsSnapshotForPlayerAsync as {},
		persistenceLayer,
		fitumi.wildcard,
		fitumi.wildcard,
	).returns(
		new Promise<void>((resolve) => resolve()),
	);

	return persistenceLayer;
}

function createDefaultPlayersService() {
	const playersService = a.fake<Players>();

	playersService.PlayerAdded = new Instance("BindableEvent").Event;
	playersService.PlayerRemoving = new Instance("BindableEvent").Event;

	a.callTo(playersService.GetPlayers as {}, playersService).returns([]);

	return playersService;
}

function createFakePlayer() {
	const player = a.fake<Player>();
	player.Name = HttpService.GenerateGUID();
	player.UserId = math.random(1, 2 ** 20);

	return player;
}

function createFakeSignalFactory() {
	const signalFactory = a.fake<SignalFactory>();

	a.callTo(signalFactory.createInstance as {}, signalFactory).returns(a.valueGeneratorCallback(createFakeSignal));

	return signalFactory;
}

class UnitTestablePlayerStatisticsProvider extends PlayerStatisticsProvider<typeof statsDef, typeof eventsDef> {
	public constructor(
		args?: Partial<{
			dataModel: DataModel;
			dumpsterFactory: DumpsterFactory;
			playersService: Players;
			playerStatisticsPersistenceLayer: IPlayerStatisticsPersistenceLayer<typeof statsDef>;
			signalFactory: SignalFactory;
		}>,
	) {
		super(
			args?.dataModel ?? a.fake<DataModel>(),
			args?.dumpsterFactory ?? new DumpsterFactory(),
			eventsDef,
			args?.playersService ?? createDefaultPlayersService(),
			args?.playerStatisticsPersistenceLayer ?? createDefaultPersistenceLayer(),
			args?.signalFactory ?? new SignalFactory(),
			statsDef,
		);
	}

	public getIsDestroyed() {
		return this.isDestroyed;
	}
}

export = () => {
	// IDestroyable
	describe("destroy", () => {
		it("should call burn on the instance's dumpster and set isDestroyed to true", () => {
			const dumpster = a.fake<Dumpster>();
			const dumpsterFactory = a.fake<DumpsterFactory>();
			a.callTo(dumpsterFactory.createInstance as {}, dumpsterFactory).returns(dumpster);

			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider({ dumpsterFactory });

			playerStatisticsProvider.destroy();

			expect(a.callTo(dumpster.burn as {}, dumpster).didHappen()).to.equal(true);
			expect(playerStatisticsProvider.getIsDestroyed()).to.equal(true);
		});
	});

	// IPlayerStatisticsLoader
	describe("statisticsLoadedForPlayer event", () => {
		it("should throw if a connect is attempted after destroying the instance", () => {
			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider();

			playerStatisticsProvider.destroy();

			expect(() => playerStatisticsProvider.statisticsLoadedForPlayer.Connect(() => {})).to.throw();
		});

		it("should be fired shortly after a player is added to the game", () => {
			const playersService = createDefaultPlayersService();
			const playerAddedBindable = new Instance("BindableEvent");
			playersService.PlayerAdded = playerAddedBindable.Event;

			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider({ playersService });

			// need to use a simple table to avoid getting screwed by the C/Luau barrier
			const player = {
				UserId: math.random(1, 2 ** 20),
			} as Player;

			const statisticsLoadedPromise = new Promise<boolean>((resolve) => {
				const connection = playerStatisticsProvider.statisticsLoadedForPlayer.Connect((playerArg) => {
					// need to use UserId as a proxy since the table is passed through the C/Luau barrier and isn't the same table in the end
					if (playerArg.UserId === player.UserId) {
						resolve(true);
						connection.Disconnect();
					}
				});
			});

			playerAddedBindable.Fire(player);

			expect(
				Promise.race([
					statisticsLoadedPromise,
					new Promise<boolean>((resolve) => Promise.delay(3).then(() => resolve(false))),
				]).expect(),
			).to.equal(true);
		});
	});

	describe("areStatisticsLoadedForPlayer", () => {
		it("should throw if the instance is destroyed", () => {
			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider();

			playerStatisticsProvider.destroy();

			expect(() => playerStatisticsProvider.areStatisticsLoadedForPlayer(createFakePlayer())).to.throw();
		});

		it("should return false if the player's statistics haven't loaded yet", () => {
			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider();

			expect(playerStatisticsProvider.areStatisticsLoadedForPlayer(createFakePlayer())).to.equal(false);
		});

		it("should return true if the player's statistics have loaded", () => {
			const playersService = createDefaultPlayersService();
			const playerAddedFakeSignal = createFakeSignal<(player: Player) => void>();
			playersService.PlayerAdded = (playerAddedFakeSignal as unknown) as RBXScriptSignal;

			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider({
				playersService,
				signalFactory: createFakeSignalFactory(),
			});

			const player = createFakePlayer();

			const statisticsLoadedPromise = new Promise<boolean>((resolve) => {
				const connection = playerStatisticsProvider.statisticsLoadedForPlayer.Connect((playerArg) => {
					// need to use UserId as a proxy since the table is passed through the C/Luau barrier and isn't the same table in the end
					if (playerArg === player) {
						resolve(true);
						connection.Disconnect();
					}
				});
			});

			playerAddedFakeSignal.fire(player);

			statisticsLoadedPromise.expect();

			expect(playerStatisticsProvider.areStatisticsLoadedForPlayer(player)).to.equal(true);
		});

		it("should return false if the player has left the game", () => {
			const playersService = createDefaultPlayersService();
			const playerAddedFakeSignal = createFakeSignal<(player: Player) => void>();
			const playerRemovingFakeSignal = createFakeSignal<(player: Player) => void>();

			playersService.PlayerAdded = (playerAddedFakeSignal as unknown) as RBXScriptSignal;
			playersService.PlayerRemoving = (playerRemovingFakeSignal as unknown) as RBXScriptSignal;

			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider({
				playersService,
				signalFactory: createFakeSignalFactory(),
			});

			const player = createFakePlayer();

			const statisticsLoadedPromise = new Promise<boolean>((resolve) => {
				const connection = playerStatisticsProvider.statisticsLoadedForPlayer.Connect((playerArg) => {
					// need to use UserId as a proxy since the table is passed through the C/Luau barrier and isn't the same table in the end
					if (playerArg === player) {
						resolve(true);
						connection.Disconnect();
					}
				});
			});

			playerAddedFakeSignal.fire(player);

			statisticsLoadedPromise.expect();

			playerRemovingFakeSignal.fire(player);

			expect(playerStatisticsProvider.areStatisticsLoadedForPlayer(player)).to.equal(false);
		});
	});

	describe("waitForStatisticsToLoadForPlayer", () => {
		it("should throw if the instance is destroyed", () => {
			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider();

			playerStatisticsProvider.destroy();

			expect(() => playerStatisticsProvider.waitForStatisticsToLoadForPlayer(createFakePlayer())).to.throw();
		});

		it("should return immediately if the player was already loaded", () => {
			const playersService = createDefaultPlayersService();
			const playerAddedFakeSignal = createFakeSignal<(player: Player) => void>();
			playersService.PlayerAdded = (playerAddedFakeSignal as unknown) as RBXScriptSignal;

			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider({
				playersService,
				signalFactory: createFakeSignalFactory(),
			});

			const player = createFakePlayer();

			const statisticsLoadedPromise = new Promise<boolean>((resolve) => {
				const connection = playerStatisticsProvider.statisticsLoadedForPlayer.Connect((playerArg) => {
					// need to use UserId as a proxy since the table is passed through the C/Luau barrier and isn't the same table in the end
					if (playerArg === player) {
						resolve(true);
						connection.Disconnect();
					}
				});
			});

			playerAddedFakeSignal.fire(player);
			statisticsLoadedPromise.expect();

			const startUnixTimestampMillis = DateTime.now().UnixTimestampMillis;
			playerStatisticsProvider.waitForStatisticsToLoadForPlayer(player);
			const endUnixTimestampMillis = DateTime.now().UnixTimestampMillis;

			expect(endUnixTimestampMillis).to.be.near(startUnixTimestampMillis, math.ceil((1 / 60) * 1000));
		});

		it("should not return until the player is loaded", () => {
			const playersService = createDefaultPlayersService();
			const playerAddedFakeSignal = createFakeSignal<(player: Player) => void>();
			playersService.PlayerAdded = (playerAddedFakeSignal as unknown) as RBXScriptSignal;

			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider({
				playersService,
				signalFactory: createFakeSignalFactory(),
			});

			const player = createFakePlayer();

			const statisticsLoadedPromise = new Promise<boolean>((resolve) => {
				const connection = playerStatisticsProvider.statisticsLoadedForPlayer.Connect((playerArg) => {
					// need to use UserId as a proxy since the table is passed through the C/Luau barrier and isn't the same table in the end
					if (playerArg === player) {
						resolve(true);
						connection.Disconnect();
					}
				});
			});

			const waitForStatisticsToLoadForPlayerPromise = new Promise<void>((resolve) => {
				playerStatisticsProvider.waitForStatisticsToLoadForPlayer(player);
				resolve();
			});

			RunService.Heartbeat.Wait();
			expect(waitForStatisticsToLoadForPlayerPromise.getStatus()).to.equal(Promise.Status.Started);

			playerAddedFakeSignal.fire(player);
			statisticsLoadedPromise.expect();

			// wait for two heartbeats because of how the fake signal wait works
			RunService.Heartbeat.Wait();
			RunService.Heartbeat.Wait();
			expect(waitForStatisticsToLoadForPlayerPromise.getStatus()).to.equal(Promise.Status.Resolved);
		});
	});

	// IPlayerStatisticsReader
	describe("getStatisticsSnapshotForPlayer", () => {
		it("should throw if the instance is destroyed", () => {
			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider();

			playerStatisticsProvider.destroy();

			expect(() => playerStatisticsProvider.getStatisticsSnapshotForPlayer(createFakePlayer())).to.throw();
		});

		it("should throw if the player's statistics have not yet loaded", () => {
			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider();

			expect(() => playerStatisticsProvider.getStatisticsSnapshotForPlayer(createFakePlayer())).to.throw();
		});

		it("should return the default statistic values for a new player", () => {
			const playersService = createDefaultPlayersService();
			const playerAddedFakeSignal = createFakeSignal<(player: Player) => void>();
			playersService.PlayerAdded = (playerAddedFakeSignal as unknown) as RBXScriptSignal;

			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider({
				playersService,
				signalFactory: createFakeSignalFactory(),
			});

			const player = createFakePlayer();

			const statisticsLoadedPromise = new Promise<boolean>((resolve) => {
				const connection = playerStatisticsProvider.statisticsLoadedForPlayer.Connect((playerArg) => {
					// need to use UserId as a proxy since the table is passed through the C/Luau barrier and isn't the same table in the end
					if (playerArg === player) {
						resolve(true);
						connection.Disconnect();
					}
				});
			});

			playerAddedFakeSignal.fire(player);
			statisticsLoadedPromise.expect();

			const statisticsSnapshot = playerStatisticsProvider.getStatisticsSnapshotForPlayer(player);

			expect(statisticsSnapshot.increment).to.equal(statsDef.increment.defaultValue);
			expect(statisticsSnapshot.max).to.equal(statsDef.max.defaultValue);
			expect(statisticsSnapshot.min).to.equal(statsDef.min.defaultValue);
			expect(statisticsSnapshot.sum).to.equal(statsDef.sum.defaultValue);
		});

		it("should return the loaded statistic values for a returning player", () => {
			const playersService = createDefaultPlayersService();
			const playerAddedFakeSignal = createFakeSignal<(player: Player) => void>();
			playersService.PlayerAdded = (playerAddedFakeSignal as unknown) as RBXScriptSignal;

			const loadedStatisticsSnapshot = identity<StatisticsSnapshot<typeof statsDef>>({
				increment: math.random(5, 10),
				max: math.random(200, 250),
				min: math.random(0, 50),
				sum: math.random(750, 1000),
			});

			const player = createFakePlayer();

			const persistenceLayer = a.fake<Mutable<IPlayerStatisticsPersistenceLayer<typeof statsDef>>>();
			a.callTo(persistenceLayer.loadStatisticsSnapshotForPlayerAsync as {}, persistenceLayer, player).returns(
				Promise.resolve(loadedStatisticsSnapshot),
			);

			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider({
				playersService,
				playerStatisticsPersistenceLayer: persistenceLayer,
				signalFactory: createFakeSignalFactory(),
			});

			const statisticsLoadedPromise = new Promise<boolean>((resolve) => {
				const connection = playerStatisticsProvider.statisticsLoadedForPlayer.Connect((playerArg) => {
					// need to use UserId as a proxy since the table is passed through the C/Luau barrier and isn't the same table in the end
					if (playerArg === player) {
						resolve(true);
						connection.Disconnect();
					}
				});
			});

			playerAddedFakeSignal.fire(player);
			statisticsLoadedPromise.expect();

			const statisticsSnapshot = playerStatisticsProvider.getStatisticsSnapshotForPlayer(player);

			expect(statisticsSnapshot.increment).to.equal(loadedStatisticsSnapshot.increment);
			expect(statisticsSnapshot.max).to.equal(loadedStatisticsSnapshot.max);
			expect(statisticsSnapshot.min).to.equal(loadedStatisticsSnapshot.min);
			expect(statisticsSnapshot.sum).to.equal(loadedStatisticsSnapshot.sum);
		});
	});

	describe("getStatisticValueForPlayer", () => {
		it("should throw if the instance is destroyed", () => {
			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider();

			playerStatisticsProvider.destroy();

			expect(() => playerStatisticsProvider.getStatisticValueForPlayer(createFakePlayer(), "sum")).to.throw();
		});

		it("should throw if the player's statistics have not yet loaded", () => {
			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider();

			expect(() => playerStatisticsProvider.getStatisticValueForPlayer(createFakePlayer(), "sum")).to.throw();
		});

		it("should return the default statistic value for a new player", () => {
			const playersService = createDefaultPlayersService();
			const playerAddedFakeSignal = createFakeSignal<(player: Player) => void>();
			playersService.PlayerAdded = (playerAddedFakeSignal as unknown) as RBXScriptSignal;

			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider({
				playersService,
				signalFactory: createFakeSignalFactory(),
			});

			const player = createFakePlayer();

			const statisticsLoadedPromise = new Promise<boolean>((resolve) => {
				const connection = playerStatisticsProvider.statisticsLoadedForPlayer.Connect((playerArg) => {
					// need to use UserId as a proxy since the table is passed through the C/Luau barrier and isn't the same table in the end
					if (playerArg === player) {
						resolve(true);
						connection.Disconnect();
					}
				});
			});

			playerAddedFakeSignal.fire(player);
			statisticsLoadedPromise.expect();

			expect(playerStatisticsProvider.getStatisticValueForPlayer(player, "increment")).to.equal(
				statsDef.increment.defaultValue,
			);

			expect(playerStatisticsProvider.getStatisticValueForPlayer(player, "max")).to.equal(
				statsDef.max.defaultValue,
			);

			expect(playerStatisticsProvider.getStatisticValueForPlayer(player, "min")).to.equal(
				statsDef.min.defaultValue,
			);

			expect(playerStatisticsProvider.getStatisticValueForPlayer(player, "sum")).to.equal(
				statsDef.sum.defaultValue,
			);
		});

		it("should return the loaded statistic values for a returning player", () => {
			const playersService = createDefaultPlayersService();
			const playerAddedFakeSignal = createFakeSignal<(player: Player) => void>();
			playersService.PlayerAdded = (playerAddedFakeSignal as unknown) as RBXScriptSignal;

			const loadedStatisticsSnapshot = identity<StatisticsSnapshot<typeof statsDef>>({
				increment: math.random(5, 10),
				max: math.random(200, 250),
				min: math.random(0, 50),
				sum: math.random(750, 1000),
			});

			const player = createFakePlayer();

			const persistenceLayer = a.fake<Mutable<IPlayerStatisticsPersistenceLayer<typeof statsDef>>>();
			a.callTo(persistenceLayer.loadStatisticsSnapshotForPlayerAsync as {}, persistenceLayer, player).returns(
				Promise.resolve(loadedStatisticsSnapshot),
			);

			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider({
				playersService,
				playerStatisticsPersistenceLayer: persistenceLayer,
				signalFactory: createFakeSignalFactory(),
			});

			const statisticsLoadedPromise = new Promise<boolean>((resolve) => {
				const connection = playerStatisticsProvider.statisticsLoadedForPlayer.Connect((playerArg) => {
					// need to use UserId as a proxy since the table is passed through the C/Luau barrier and isn't the same table in the end
					if (playerArg === player) {
						resolve(true);
						connection.Disconnect();
					}
				});
			});

			playerAddedFakeSignal.fire(player);
			statisticsLoadedPromise.expect();

			expect(playerStatisticsProvider.getStatisticValueForPlayer(player, "increment")).to.equal(
				loadedStatisticsSnapshot.increment,
			);

			expect(playerStatisticsProvider.getStatisticValueForPlayer(player, "max")).to.equal(
				loadedStatisticsSnapshot.max,
			);

			expect(playerStatisticsProvider.getStatisticValueForPlayer(player, "min")).to.equal(
				loadedStatisticsSnapshot.min,
			);

			expect(playerStatisticsProvider.getStatisticValueForPlayer(player, "sum")).to.equal(
				loadedStatisticsSnapshot.sum,
			);
		});
	});

	describe("subscribeToStatisticUpdates", () => {
		it("should throw if the instance is destroyed", () => {
			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider();

			playerStatisticsProvider.destroy();

			expect(() => playerStatisticsProvider.subscribeToStatisticUpdates("sum", () => {})).to.throw();
		});

		it("should disconnect subscription connections when the instance is destroyed", () => {
			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider();

			const subscriptionConnection = playerStatisticsProvider.subscribeToStatisticUpdates("sum", () => {});

			expect(subscriptionConnection.Connected).to.equal(true);

			playerStatisticsProvider.destroy();

			expect(subscriptionConnection.Connected).to.equal(false);
		});
	});

	// IPlayerStatisticEventsPoster
	describe("recordEvent", () => {
		it("should throw if the instance is destroyed", () => {
			const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider();

			playerStatisticsProvider.destroy();

			expect(() => playerStatisticsProvider.recordEvent(createFakePlayer(), "updatesAll", 100)).to.throw();
		});

		it("should provide expected arguments to subscription handlers and update statistics snapshot", () => {
			const loadedStatisticsSnapshot = identity<StatisticsSnapshot<typeof statsDef>>({
				increment: math.random(5, 10),
				max: math.random(200, 250),
				min: math.random(1, 50),
				sum: math.random(750, 1000),
			});

			const eventValues = [
				loadedStatisticsSnapshot.min - 1,
				math.random(loadedStatisticsSnapshot.min + 1, loadedStatisticsSnapshot.max - 1),
				loadedStatisticsSnapshot.max + 1,
			];

			for (const eventValue of eventValues) {
				const playersService = createDefaultPlayersService();
				const playerAddedFakeSignal = createFakeSignal<(player: Player) => void>();
				playersService.PlayerAdded = (playerAddedFakeSignal as unknown) as RBXScriptSignal;

				const player = createFakePlayer();

				const persistenceLayer = a.fake<Mutable<IPlayerStatisticsPersistenceLayer<typeof statsDef>>>();
				a.callTo(persistenceLayer.loadStatisticsSnapshotForPlayerAsync as {}, persistenceLayer, player).returns(
					Promise.resolve({ ...loadedStatisticsSnapshot }),
				);

				const playerStatisticsProvider = new UnitTestablePlayerStatisticsProvider({
					playersService,
					playerStatisticsPersistenceLayer: persistenceLayer,
					signalFactory: createFakeSignalFactory(),
				});

				const statisticsLoadedPromise = new Promise<boolean>((resolve) => {
					const connection = playerStatisticsProvider.statisticsLoadedForPlayer.Connect((playerArg) => {
						// need to use UserId as a proxy since the table is passed through the C/Luau barrier and isn't the same table in the end
						if (playerArg === player) {
							resolve(true);
							connection.Disconnect();
						}
					});
				});

				playerAddedFakeSignal.fire(player);
				statisticsLoadedPromise.expect();

				const expectedNewIncrementValue = loadedStatisticsSnapshot.increment + 1;
				const expectedNewMaxValue = math.max(loadedStatisticsSnapshot.max, eventValue);
				const expectedNewMinValue = math.min(loadedStatisticsSnapshot.min, eventValue);
				const expectedNewSumValue = loadedStatisticsSnapshot.sum + eventValue;

				const updatePromises = [
					new Promise<void>((resolve, reject) =>
						playerStatisticsProvider.subscribeToStatisticUpdates(
							"increment",
							(playerArg, newValue, oldValue) => {
								if (playerArg !== player) {
									reject("wrong player for increment");
								}

								if (oldValue !== loadedStatisticsSnapshot.increment) {
									reject(
										`expected oldValue for increment to be ${loadedStatisticsSnapshot.increment}, got ${oldValue}`,
									);
								}

								if (newValue !== expectedNewIncrementValue) {
									reject(
										`expected newValue for increment to be ${expectedNewIncrementValue}, got ${newValue}`,
									);
								}

								resolve();
							},
						),
					),

					new Promise<void>((resolve, reject) => {
						if (expectedNewMaxValue === loadedStatisticsSnapshot.max) {
							resolve();
						}

						playerStatisticsProvider.subscribeToStatisticUpdates("max", (playerArg, newValue, oldValue) => {
							if (playerArg !== player) {
								reject("wrong player for max");
							}

							if (oldValue !== loadedStatisticsSnapshot.max) {
								reject(
									`expected oldValue for max to be ${loadedStatisticsSnapshot.max}, got ${oldValue}`,
								);
							}

							if (newValue !== expectedNewMaxValue) {
								reject(`expected newValue for max to be ${expectedNewMaxValue}, got ${newValue}`);
							}

							resolve();
						});
					}),

					new Promise<void>((resolve, reject) => {
						if (expectedNewMinValue === loadedStatisticsSnapshot.min) {
							resolve();
						}

						playerStatisticsProvider.subscribeToStatisticUpdates("min", (playerArg, newValue, oldValue) => {
							if (playerArg !== player) {
								reject("wrong player for min");
							}

							if (oldValue !== loadedStatisticsSnapshot.min) {
								reject(
									`expected oldValue for min to be ${loadedStatisticsSnapshot.min}, got ${oldValue}`,
								);
							}

							if (newValue !== expectedNewMinValue) {
								reject(`expected newValue for min to be ${expectedNewMinValue}, got ${newValue}`);
							}

							resolve();
						});
					}),

					new Promise<void>((resolve, reject) =>
						playerStatisticsProvider.subscribeToStatisticUpdates("sum", (playerArg, newValue, oldValue) => {
							if (playerArg !== player) {
								reject("wrong player for sum");
							}

							if (oldValue !== loadedStatisticsSnapshot.sum) {
								reject(
									`expected oldValue for sum to be ${loadedStatisticsSnapshot.sum}, got ${oldValue}`,
								);
							}

							if (newValue !== expectedNewSumValue) {
								reject(`expected newValue for sum to be ${expectedNewSumValue}, got ${newValue}`);
							}

							resolve();
						}),
					),
				];

				playerStatisticsProvider.recordEvent(player, "updatesAll", eventValue);

				const didAllSucceed = Promise.race([
					Promise.all(updatePromises)
						.then(() => true)
						.catch((errorMessage) => error(errorMessage)),
					Promise.delay(3).then(() => false),
				]).expect();
				expect(didAllSucceed).to.equal(true);

				const statisticsSnapshot = playerStatisticsProvider.getStatisticsSnapshotForPlayer(player);

				expect(statisticsSnapshot.increment).to.equal(expectedNewIncrementValue);
				expect(statisticsSnapshot.max).to.equal(expectedNewMaxValue);
				expect(statisticsSnapshot.min).to.equal(expectedNewMinValue);
				expect(statisticsSnapshot.sum).to.equal(expectedNewSumValue);
			}
		});
	});
};
