[@rbxts/player-statistics](../README.md) / IPlayerStatisticEventsPoster

# Interface: IPlayerStatisticEventsPoster<StatsDef, EventsDef\>

Provides the interface for posting player statistic events and implements [IPlayerStatisticsLoader](iplayerstatisticsloader.md)

## Type parameters

Name | Type |
:------ | :------ |
`StatsDef` | [*StatisticsDefinition*](../README.md#statisticsdefinition) |
`EventsDef` | [*EventsDefinition*](../README.md#eventsdefinition)<StatsDef\> |

## Hierarchy

* [*IPlayerStatisticsLoader*](iplayerstatisticsloader.md)

  ↳ **IPlayerStatisticEventsPoster**

  ↳↳ [*IPlayerStatisticsProvider*](iplayerstatisticsprovider.md)

## Table of contents

### Properties

- [statisticsLoadedForPlayer](iplayerstatisticeventsposter.md#statisticsloadedforplayer)

### Methods

- [areStatisticsLoadedForPlayer](iplayerstatisticeventsposter.md#arestatisticsloadedforplayer)
- [recordEvent](iplayerstatisticeventsposter.md#recordevent)
- [waitForStatisticsToLoadForPlayer](iplayerstatisticeventsposter.md#waitforstatisticstoloadforplayer)

## Properties

### statisticsLoadedForPlayer

• `Readonly` **statisticsLoadedForPlayer**: *IReadOnlySignal*<(`player`: *Player*) => *void*\>

Fired when statistics are loaded for a player

Inherited from: [IPlayerStatisticsLoader](iplayerstatisticsloader.md).[statisticsLoadedForPlayer](iplayerstatisticsloader.md#statisticsloadedforplayer)

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

Inherited from: [IPlayerStatisticsLoader](iplayerstatisticsloader.md)

Defined in: [src/interfaces/IPlayerStatisticsLoader.d.ts:14](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/interfaces/IPlayerStatisticsLoader.d.ts#L14)

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

Defined in: [src/interfaces/IPlayerStatisticEventsPoster.d.ts:18](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/interfaces/IPlayerStatisticEventsPoster.d.ts#L18)

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

Defined in: [src/interfaces/IPlayerStatisticsLoader.d.ts:20](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/interfaces/IPlayerStatisticsLoader.d.ts#L20)
