[@rbxts/player-statistics](../README.md) / [Exports](../modules.md) / IPlayerStatisticsLoader

# Interface: IPlayerStatisticsLoader

Provides an interface for loading player statistics

## Hierarchy

* **IPlayerStatisticsLoader**

  ↳ [*IPlayerStatisticEventsPoster*](iplayerstatisticeventsposter.md)

  ↳ [*IPlayerStatisticsReader*](iplayerstatisticsreader.md)

## Table of contents

### Properties

- [statisticsLoadedForPlayer](iplayerstatisticsloader.md#statisticsloadedforplayer)

### Methods

- [areStatisticsLoadedForPlayer](iplayerstatisticsloader.md#arestatisticsloadedforplayer)
- [waitForStatisticsToLoadForPlayer](iplayerstatisticsloader.md#waitforstatisticstoloadforplayer)

## Properties

### statisticsLoadedForPlayer

• `Readonly` **statisticsLoadedForPlayer**: *IReadOnlySignal*<(`player`: *Player*) => *void*\>

Fired when statistics are loaded for a player

Defined in: [src/interfaces/IPlayerStatisticsLoader.d.ts:8](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/interfaces/IPlayerStatisticsLoader.d.ts#L8)

## Methods

### areStatisticsLoadedForPlayer

▸ **areStatisticsLoadedForPlayer**(`player`: *Player*): *boolean*

Returns whether statistics have been loaded for the given player

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The given player    |

**Returns:** *boolean*

Defined in: [src/interfaces/IPlayerStatisticsLoader.d.ts:14](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/interfaces/IPlayerStatisticsLoader.d.ts#L14)

___

### waitForStatisticsToLoadForPlayer

▸ **waitForStatisticsToLoadForPlayer**(`player`: *Player*): *void*

Waits (yields current coroutine) until statistics have been loaded for the given player

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The given player    |

**Returns:** *void*

Defined in: [src/interfaces/IPlayerStatisticsLoader.d.ts:20](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/interfaces/IPlayerStatisticsLoader.d.ts#L20)
