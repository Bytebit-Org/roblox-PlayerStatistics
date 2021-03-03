# Player Statistics
<p align="center">
	<a href="https://github.com/Bytebit-Org/roblox-PlayerStatistics/actions">
        <img src="https://github.com/Bytebit-Org/roblox-PlayerStatistics/workflows/CI/badge.svg" alt="CI status" />
    </a>
	<a href="http://makeapullrequest.com">
		<img src="https://img.shields.io/badge/PRs-welcome-blue.svg" alt="PRs Welcome" />
	</a>
	<a href="https://opensource.org/licenses/MIT">
		<img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" />
	</a>
	<a href="https://discord.gg/QEz3v8y">
		<img src="https://img.shields.io/badge/discord-join-7289DA.svg?logo=discord&longCache=true&style=flat" alt="Discord server" />
	</a>
</p>

Player Statistics is a package for Roblox game developers with built-in persistence that can be swapped modularly to fit into any game's persistence schemes.
Define your game's statistics for players and the events that cause updates with two simple definition files, then use one line of code to post events.
Statistics will be updated according to your definition files and automatically persisted upon player's leaving the game or the game closing.

## Installation
### roblox-ts
Simply install to your [roblox-ts](https://roblox-ts.com/) project as follows:
```
npm i @rbxts/player-statistics
```

## Documentation
Documentation can be found [here](https://github.com/Bytebit-Org/roblox-PlayerStatistics/tree/master/docs), is included in the TypeScript files directly, and was generated using [TypeDoc](https://typedoc.org/).

## Example
Let's create an example keeping track of a player's high score and their average score, which can be tracked using the total points and the number of times they've played. The first step is to define these statistics in a definition file like so:

```ts
import { StatisticDefinition, StandardStatisticUpdateFunctions } from "@rbxts/player-statistics";

export const PlayerStatisticsDefinition = {
    highScore: identity<StatisticDescription>({
        defaultValue: 0,
        updateFunction: math.max,
    }),
    
    numberOfGamesPlayed: identity<StatisticDescription>({
        defaultValue: 0,
        updateFunction: StandardStatisticUpdateFunctions.increment,
    }),

    scoreSum: identity<StatisticDescription>({
        defaultValue: 0,
        updateFunction: StandardStatisticUpdateFunctions.sum,
    }),
};
```

And now we can define a single event which will be associated with all three of our statistics, as shown:

```ts
import { PlayerStatisticsDefinition } from "./PlayerStatisticsDefinition";

export const PlayerStatisticEventsDefinition = {
    gameCompleted: identity<ReadonlyArray<typeof PlayerStatisticsDefinition>>(["highScore", "numberOfGamesPlayed", "scoreSum"])
};
```

And now we simply wire this up in our game's bootstrapping code, complete with persistence:

```ts
import { DataStoreService } from "@rbxts/services";
import { DataStorePlayerStatisticsPersistenceLayer, PlayerStatisticsProvider } from "@rbxts/player-statistics";
import { PlayerStatisticsDefinition } from "./data/PlayerStatisticsDefinition";
import { PlayerStatisticEventsDefinition } from "./data/PlayerStatisticEventsDefinition";

const playerStatisticsPersistenceLayer = DataStorePlayerStatisticsPersistenceLayer.create(DataStoreService.GetDataStore("PlayerStatistics"));
const playerStatisticsProvider = PlayerStatisticsProvider.create(PlayerStatisticEventsDefinition, playerStatisticsPersistenceLayer, PlayerStatisticsDefinition);
```

Finally, after a game is completed, we call this one simple line of code:

```ts
playerStatisticsProvider.recordEvent(player, "gameCompleted", playerScore);
```

And suddenly all three of our statistics will be updated and persisted when the player leaves or the server closes!