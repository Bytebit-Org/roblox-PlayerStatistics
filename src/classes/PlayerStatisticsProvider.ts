import { ISignal, Signal } from "@rbxts/signals-tooling";
import { IPlayerStatisticsPersistenceLayer } from "../interfaces/IPlayerStatisticsPersistenceLayer";
import { StatisticsDefinition } from "../types/StatisticsDefinition";
import { StatisticsSnapshot } from "../types/StatisticsSnapshot";
import Object from "@rbxts/object-utils";
import { Dumpster, IDestroyable } from "@rbxts/dumpster";
import { DumpsterFactory } from "factories/DumpsterFactory";
import { SignalFactory } from "factories/SignalFactory";
import { attemptTaskWithUnlimitedRetries } from "functions/AttemptTaskWithUnlimitedRetries";
import { EventsDefinition } from "../types/EventsDefinition";
import { Players } from "@rbxts/services";

function createDefaultStatisticsSnapshot<Stats extends StatisticsDefinition>(
	statisticsDefinition: Stats,
): StatisticsSnapshot<Stats> {
	const defaultStatisticsSnapshot: Partial<StatisticsSnapshot<Stats>> = {};
	for (const key of Object.keys(statisticsDefinition)) {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const statisticName = (key as unknown) as keyof Stats;

		defaultStatisticsSnapshot[statisticName] = statisticsDefinition[statisticName].defaultValue;
	}

	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	return defaultStatisticsSnapshot as StatisticsSnapshot<Stats>;
}

export class PlayerStatisticsProvider<
	StatsDef extends StatisticsDefinition,
	EventsDef extends EventsDefinition<StatsDef>
> implements IDestroyable {
	private readonly currentStatisticsSnapshotsByPlayer: Map<Player, StatisticsSnapshot<StatsDef>>;
	private readonly dumpster: Dumpster;
	private isDestroyed: boolean;
	private readonly statisticUpdatedSignalsByStatisticName: Map<
		keyof StatsDef,
		ISignal<(player: Player, newValue: number, oldValue: number) => void>
	>;

	private constructor(
		dumpsterFactory: DumpsterFactory,
		private readonly eventsDefinition: EventsDef,
		private readonly playersService: Players,
		private readonly playerStatisticsPersistenceLayer: IPlayerStatisticsPersistenceLayer<StatsDef>,
		private readonly signalFactory: SignalFactory,
		private readonly statisticsDefinition: StatsDef,
	) {
		this.currentStatisticsSnapshotsByPlayer = new Map();
		this.dumpster = dumpsterFactory.createInstance();
		this.isDestroyed = false;
		this.statisticUpdatedSignalsByStatisticName = new Map();

		this.dumpster.dump(this.statisticUpdatedSignalsByStatisticName, (map) => {
			map.forEach((signal) => signal.destroy());
			map.clear();
		});
		this.dumpster.dump(this.currentStatisticsSnapshotsByPlayer, (map) => map.clear());

		this.listenForPlayersToJoinAndLeave();
	}

	public static create<StatsDef extends StatisticsDefinition, EventsDef extends EventsDefinition<StatsDef>>(
		this: void,
		eventsDefinition: EventsDef,
		playerStatisticsPersistenceLayer: IPlayerStatisticsPersistenceLayer<StatsDef>,
		statisticsDefinition: StatsDef,
	) {
		return new PlayerStatisticsProvider(
			new DumpsterFactory(),
			eventsDefinition,
			Players,
			playerStatisticsPersistenceLayer,
			new SignalFactory(),
			statisticsDefinition,
		);
	}

	public areStatisticsLoadedForPlayer(player: Player) {
		if (this.isDestroyed) {
			throw `Attempt to call a method on a destroyed instance of type ${getmetatable(this)}`;
		}

		return this.currentStatisticsSnapshotsByPlayer.has(player);
	}

	public destroy() {
		if (this.isDestroyed) {
			warn(`Attempt to destroy an already destroyed instance of type ${getmetatable(this)}`);
			return;
		}

		this.dumpster.burn();
		this.isDestroyed = true;
	}

	public getStatisticValueForPlayer<StatName extends keyof StatsDef>(player: Player, statisticName: StatName) {
		if (this.isDestroyed) {
			throw `Attempt to call a method on a destroyed instance of type ${getmetatable(this)}`;
		}

		const currentStatisticsSnapshot = this.currentStatisticsSnapshotsByPlayer.get(player);
		if (currentStatisticsSnapshot === undefined) {
			throw `Statistics not yet loaded for player ${player.Name}`;
		}

		return currentStatisticsSnapshot[statisticName];
	}

	public recordEvent(player: Player, eventName: ExtractKeys<EventsDef, string>, value: number) {
		if (this.isDestroyed) {
			throw `Attempt to call a method on a destroyed instance of type ${getmetatable(this)}`;
		}

		const currentStatisticsSnapshot = this.currentStatisticsSnapshotsByPlayer.get(player);
		if (currentStatisticsSnapshot === undefined) {
			throw `Statistics not yet loaded for player ${player.Name}`;
		}

		const snapshotEdits: Partial<StatisticsSnapshot<StatsDef>> = {};
		const dataForSignalsToFire = new Array<{
			newValue: number;
			oldValue: number;
			signal: ISignal<(player: Player, newValue: number, oldValue: number) => void>;
		}>();

		for (const statisticName of this.eventsDefinition[eventName]) {
			const statisticDefinition = this.statisticsDefinition[statisticName];

			const currentStatisticValue = currentStatisticsSnapshot[statisticName];
			const newStatisticValue = statisticDefinition.updateFunction(
				value,
				currentStatisticsSnapshot[statisticName],
			);

			if (currentStatisticValue !== newStatisticValue) {
				snapshotEdits[statisticName] = newStatisticValue;

				const statisticUpdatedSignal = this.statisticUpdatedSignalsByStatisticName.get(statisticName);
				if (statisticUpdatedSignal !== undefined) {
					dataForSignalsToFire.push({
						newValue: newStatisticValue,
						oldValue: currentStatisticValue,
						signal: statisticUpdatedSignal,
					});
				}
			}
		}

		const newStatisticsSnapshot: StatisticsSnapshot<StatsDef> = { ...currentStatisticsSnapshot, ...snapshotEdits };
		this.currentStatisticsSnapshotsByPlayer.set(player, newStatisticsSnapshot);

		for (const dataForSignal of dataForSignalsToFire) {
			dataForSignal.signal.fire(player, dataForSignal.newValue, dataForSignal.oldValue);
		}
	}

	public subscribeToStatisticUpdates<StatName extends keyof StatsDef>(
		statisticName: StatName,
		handler: (player: Player, newValue: number, oldValue: number) => void,
	) {
		let statisticUpdatedSignal = this.statisticUpdatedSignalsByStatisticName.get(statisticName);
		if (statisticUpdatedSignal === undefined) {
			statisticUpdatedSignal = this.signalFactory.createInstance();
			this.statisticUpdatedSignalsByStatisticName.set(statisticName, statisticUpdatedSignal);
		}

		return statisticUpdatedSignal.Connect(handler);
	}

	public waitForStatisticsToLoadForPlayer(player: Player) {
		if (this.isDestroyed) {
			throw `Attempt to call a method on a destroyed instance of type ${getmetatable(this)}`;
		}

		if (this.currentStatisticsSnapshotsByPlayer.has(player)) {
			return;
		}
	}

	private listenForPlayersToJoinAndLeave() {
		this.playersService.PlayerRemoving.Connect((player) => {
			const currentStatisticsSnapshot = this.currentStatisticsSnapshotsByPlayer.get(player);
			if (currentStatisticsSnapshot === undefined) {
				// no-op
				return;
			}

			this.currentStatisticsSnapshotsByPlayer.delete(player);

			attemptTaskWithUnlimitedRetries(
				() =>
					this.playerStatisticsPersistenceLayer.saveStatisticsSnapshotForPlayerAsync(
						player,
						currentStatisticsSnapshot,
					),
				`Save player statistics for ${player.Name}`,
			);
		});

		this.dumpster.dump(
			this.playersService.PlayerAdded.Connect((player) => this.loadStatisticsForPlayerAsync(player)),
		);
		this.playersService.GetPlayers().forEach((player) => this.loadStatisticsForPlayerAsync(player));
	}

	private async loadStatisticsForPlayerAsync(player: Player) {
		if (this.currentStatisticsSnapshotsByPlayer.has(player)) {
			// no-op
			return;
		}

		const defaultStatisticsSnapshot = createDefaultStatisticsSnapshot(this.statisticsDefinition);
		const loadedStatisticsSnapshot = await this.playerStatisticsPersistenceLayer.loadStatisticsSnapshotForPlayerAsync(
			player,
		);

		const statisticsSnapshot =
			loadedStatisticsSnapshot === undefined
				? defaultStatisticsSnapshot
				: { ...defaultStatisticsSnapshot, ...loadedStatisticsSnapshot };

		this.currentStatisticsSnapshotsByPlayer.set(player, statisticsSnapshot);
	}
}
