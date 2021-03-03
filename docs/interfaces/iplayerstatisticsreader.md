[@rbxts/player-statistics](../README.md) / [Exports](../modules.md) / IPlayerStatisticsReader

# Interface: IPlayerStatisticsReader<StatsDef\>

Provides the interface for reading player statistics and implements [IPlayerStatisticsLoader](iplayerstatisticsloader.md)

## Type parameters

Name | Type |
:------ | :------ |
`StatsDef` | [*StatisticsDefinition*](../modules.md#statisticsdefinition) |

## Hierarchy

* [*IPlayerStatisticsLoader*](iplayerstatisticsloader.md)

  ↳ **IPlayerStatisticsReader**

  ↳↳ [*IPlayerStatisticsProvider*](iplayerstatisticsprovider.md)

## Table of contents

### Properties

- [statisticsLoadedForPlayer](iplayerstatisticsreader.md#statisticsloadedforplayer)

### Methods

- [areStatisticsLoadedForPlayer](iplayerstatisticsreader.md#arestatisticsloadedforplayer)
- [getStatisticValueForPlayer](iplayerstatisticsreader.md#getstatisticvalueforplayer)
- [getStatisticsSnapshotForPlayer](iplayerstatisticsreader.md#getstatisticssnapshotforplayer)
- [subscribeToStatisticUpdates](iplayerstatisticsreader.md#subscribetostatisticupdates)
- [waitForStatisticsToLoadForPlayer](iplayerstatisticsreader.md#waitforstatisticstoloadforplayer)

## Properties

### statisticsLoadedForPlayer

• `Readonly` **statisticsLoadedForPlayer**: *IReadOnlySignal*<(`player`: *Player*) => *void*\>

Fired when statistics are loaded for a player

Inherited from: [IPlayerStatisticsLoader](iplayerstatisticsloader.md).[statisticsLoadedForPlayer](iplayerstatisticsloader.md#statisticsloadedforplayer)

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

Inherited from: [IPlayerStatisticsLoader](iplayerstatisticsloader.md)

Defined in: [src/interfaces/IPlayerStatisticsLoader.d.ts:14](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/interfaces/IPlayerStatisticsLoader.d.ts#L14)

___

### getStatisticValueForPlayer

▸ **getStatisticValueForPlayer**(`player`: *Player*, `statisticName`: keyof StatsDef): *number*

Gets the value of a single statistic for the given player

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The given player   |
`statisticName` | keyof StatsDef | The name of the statistic to fetch    |

**Returns:** *number*

Defined in: [src/interfaces/IPlayerStatisticsReader.d.ts:21](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/interfaces/IPlayerStatisticsReader.d.ts#L21)

___

### getStatisticsSnapshotForPlayer

▸ **getStatisticsSnapshotForPlayer**(`player`: *Player*): [*StatisticsSnapshot*](../modules.md#statisticssnapshot)<StatsDef\>

Gets the current statistics snapshot for the given player

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The given player    |

**Returns:** [*StatisticsSnapshot*](../modules.md#statisticssnapshot)<StatsDef\>

Defined in: [src/interfaces/IPlayerStatisticsReader.d.ts:14](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/interfaces/IPlayerStatisticsReader.d.ts#L14)

___

### subscribeToStatisticUpdates

▸ **subscribeToStatisticUpdates**(`statisticName`: keyof StatsDef, `handler`: (`player`: *Player*, `newValue`: *number*, `oldValue`: *number*) => *void*): ISignalConnection

Subscribes to updates of statistics matching the given name for all players

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`statisticName` | keyof StatsDef | The name to match for the statistic   |
`handler` | (`player`: *Player*, `newValue`: *number*, `oldValue`: *number*) => *void* | The handler function    |

**Returns:** ISignalConnection

Defined in: [src/interfaces/IPlayerStatisticsReader.d.ts:28](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/interfaces/IPlayerStatisticsReader.d.ts#L28)

___

### waitForStatisticsToLoadForPlayer

▸ **waitForStatisticsToLoadForPlayer**(`player`: *Player*): *void*

Waits (yields current coroutine) until statistics have been loaded for the given player

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The given player    |

**Returns:** *void*

Inherited from: [IPlayerStatisticsLoader](iplayerstatisticsloader.md)

Defined in: [src/interfaces/IPlayerStatisticsLoader.d.ts:20](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/interfaces/IPlayerStatisticsLoader.d.ts#L20)
