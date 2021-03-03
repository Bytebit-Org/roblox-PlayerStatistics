[@rbxts/player-statistics](../README.md) / IPlayerStatisticsProvider

# Interface: IPlayerStatisticsProvider<StatsDef, EventsDef\>

Provides an interface for a player statistics provider, which implements [IPlayerStatisticsLoader](iplayerstatisticsloader.md), [IPlayerStatisticsReader](iplayerstatisticsreader.md), and [IPlayerStatisticEventsPoster](iplayerstatisticeventsposter.md)

## Type parameters

Name | Type |
:------ | :------ |
`StatsDef` | [*StatisticsDefinition*](../README.md#statisticsdefinition) |
`EventsDef` | [*EventsDefinition*](../README.md#eventsdefinition)<StatsDef\> |

## Hierarchy

* [*IPlayerStatisticsReader*](iplayerstatisticsreader.md)<StatsDef\>

* [*IPlayerStatisticEventsPoster*](iplayerstatisticeventsposter.md)<StatsDef, EventsDef\>

* *IDestroyable*

  ↳ **IPlayerStatisticsProvider**

## Implemented by

* [*PlayerStatisticsProvider*](../classes/playerstatisticsprovider.md)

## Table of contents

### Properties

- [statisticsLoadedForPlayer](iplayerstatisticsprovider.md#statisticsloadedforplayer)

### Methods

- [areStatisticsLoadedForPlayer](iplayerstatisticsprovider.md#arestatisticsloadedforplayer)
- [destroy](iplayerstatisticsprovider.md#destroy)
- [getStatisticValueForPlayer](iplayerstatisticsprovider.md#getstatisticvalueforplayer)
- [getStatisticsSnapshotForPlayer](iplayerstatisticsprovider.md#getstatisticssnapshotforplayer)
- [recordEvent](iplayerstatisticsprovider.md#recordevent)
- [subscribeToStatisticUpdates](iplayerstatisticsprovider.md#subscribetostatisticupdates)
- [waitForStatisticsToLoadForPlayer](iplayerstatisticsprovider.md#waitforstatisticstoloadforplayer)

## Properties

### statisticsLoadedForPlayer

• `Readonly` **statisticsLoadedForPlayer**: *IReadOnlySignal*<(`player`: *Player*) => *void*\>

Fired when statistics are loaded for a player

Inherited from: [IPlayerStatisticEventsPoster](iplayerstatisticeventsposter.md).[statisticsLoadedForPlayer](iplayerstatisticeventsposter.md#statisticsloadedforplayer)

Defined in: [src/interfaces/IPlayerStatisticsLoader.d.ts:8](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/interfaces/IPlayerStatisticsLoader.d.ts#L8)

## Methods

### areStatisticsLoadedForPlayer

▸ **areStatisticsLoadedForPlayer**(`player`: *Player*): *boolean*

Returns whether statistics have been loaded for the given player

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The given player    |

**Returns:** *boolean*

Inherited from: [IPlayerStatisticEventsPoster](iplayerstatisticeventsposter.md)

Defined in: [src/interfaces/IPlayerStatisticsLoader.d.ts:14](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/interfaces/IPlayerStatisticsLoader.d.ts#L14)

___

### destroy

▸ **destroy**(): *void*

Clean up everything

**Returns:** *void*

Defined in: node_modules/@rbxts/dumpster/Dumpster.d.ts:5

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

Inherited from: [IPlayerStatisticsReader](iplayerstatisticsreader.md)

Defined in: [src/interfaces/IPlayerStatisticsReader.d.ts:21](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/interfaces/IPlayerStatisticsReader.d.ts#L21)

___

### getStatisticsSnapshotForPlayer

▸ **getStatisticsSnapshotForPlayer**(`player`: *Player*): [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>

Gets the current statistics snapshot for the given player

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The given player    |

**Returns:** [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>

Inherited from: [IPlayerStatisticsReader](iplayerstatisticsreader.md)

Defined in: [src/interfaces/IPlayerStatisticsReader.d.ts:14](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/interfaces/IPlayerStatisticsReader.d.ts#L14)

___

### recordEvent

▸ **recordEvent**(`player`: *Player*, `eventName`: keyof EventsDef, `value`: *number*): *void*

Records a new statistically relevant event, updating all associated statistics

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The player to record the event for   |
`eventName` | keyof EventsDef | The name of the event - must be a key of the events definition type   |
`value` | *number* | The value of the event    |

**Returns:** *void*

Inherited from: [IPlayerStatisticEventsPoster](iplayerstatisticeventsposter.md)

Defined in: [src/interfaces/IPlayerStatisticEventsPoster.d.ts:18](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/interfaces/IPlayerStatisticEventsPoster.d.ts#L18)

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

Inherited from: [IPlayerStatisticsReader](iplayerstatisticsreader.md)

Defined in: [src/interfaces/IPlayerStatisticsReader.d.ts:28](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/interfaces/IPlayerStatisticsReader.d.ts#L28)

___

### waitForStatisticsToLoadForPlayer

▸ **waitForStatisticsToLoadForPlayer**(`player`: *Player*): *void*

Waits (yields current coroutine) until statistics have been loaded for the given player

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The given player    |

**Returns:** *void*

Inherited from: [IPlayerStatisticEventsPoster](iplayerstatisticeventsposter.md)

Defined in: [src/interfaces/IPlayerStatisticsLoader.d.ts:20](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/interfaces/IPlayerStatisticsLoader.d.ts#L20)
