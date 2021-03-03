[@rbxts/player-statistics](../README.md) / PlayerStatisticsProvider

# Class: PlayerStatisticsProvider<StatsDef, EventsDef\>

The standard implementation of the [IPlayerStatisticsProvider](../interfaces/iplayerstatisticsprovider.md)

## Type parameters

Name | Type |
:------ | :------ |
`StatsDef` | [*StatisticsDefinition*](../README.md#statisticsdefinition) |
`EventsDef` | [*EventsDefinition*](../README.md#eventsdefinition)<StatsDef\> |

## Implements

* [*IPlayerStatisticsProvider*](../interfaces/iplayerstatisticsprovider.md)<StatsDef, EventsDef\>

## Table of contents

### Properties

- [statisticsLoadedForPlayer](playerstatisticsprovider.md#statisticsloadedforplayer)

### Methods

- [areStatisticsLoadedForPlayer](playerstatisticsprovider.md#arestatisticsloadedforplayer)
- [destroy](playerstatisticsprovider.md#destroy)
- [getStatisticValueForPlayer](playerstatisticsprovider.md#getstatisticvalueforplayer)
- [getStatisticsSnapshotForPlayer](playerstatisticsprovider.md#getstatisticssnapshotforplayer)
- [recordEvent](playerstatisticsprovider.md#recordevent)
- [subscribeToStatisticUpdates](playerstatisticsprovider.md#subscribetostatisticupdates)
- [waitForStatisticsToLoadForPlayer](playerstatisticsprovider.md#waitforstatisticstoloadforplayer)
- [create](playerstatisticsprovider.md#create)

## Properties

### statisticsLoadedForPlayer

• `Readonly` **statisticsLoadedForPlayer**: *ISignal*<(`player`: *Player*) => *void*\>

Fired when statistics are loaded for a player

Implementation of: [IPlayerStatisticsProvider](../interfaces/iplayerstatisticsprovider.md).[statisticsLoadedForPlayer](../interfaces/iplayerstatisticsprovider.md#statisticsloadedforplayer)

Defined in: [src/classes/PlayerStatisticsProvider.ts:39](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/196aade/src/classes/PlayerStatisticsProvider.ts#L39)

## Methods

### areStatisticsLoadedForPlayer

▸ **areStatisticsLoadedForPlayer**(`player`: *Player*): *boolean*

Returns whether statistics have been loaded for the given player

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The given player    |

**Returns:** *boolean*

Implementation of: [IPlayerStatisticsProvider](../interfaces/iplayerstatisticsprovider.md)

Defined in: [src/classes/PlayerStatisticsProvider.ts:109](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/196aade/src/classes/PlayerStatisticsProvider.ts#L109)

___

### destroy

▸ **destroy**(): *void*

Clean up everything

**Returns:** *void*

Implementation of: [IPlayerStatisticsProvider](../interfaces/iplayerstatisticsprovider.md)

Defined in: [src/classes/PlayerStatisticsProvider.ts:120](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/196aade/src/classes/PlayerStatisticsProvider.ts#L120)

___

### getStatisticValueForPlayer

▸ **getStatisticValueForPlayer**(`player`: *Player*, `statisticName`: keyof StatsDef): [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>[keyof StatsDef]

**`inheritdoc`** 

#### Parameters:

Name | Type |
:------ | :------ |
`player` | *Player* |
`statisticName` | keyof StatsDef |

**Returns:** [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>[keyof StatsDef]

Defined in: [src/classes/PlayerStatisticsProvider.ts:149](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/196aade/src/classes/PlayerStatisticsProvider.ts#L149)

___

### getStatisticsSnapshotForPlayer

▸ **getStatisticsSnapshotForPlayer**(`player`: *Player*): [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>

Gets the current statistics snapshot for the given player

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The given player    |

**Returns:** [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>

Implementation of: [IPlayerStatisticsProvider](../interfaces/iplayerstatisticsprovider.md)

Defined in: [src/classes/PlayerStatisticsProvider.ts:133](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/196aade/src/classes/PlayerStatisticsProvider.ts#L133)

___

### recordEvent

▸ **recordEvent**(`player`: *Player*, `eventName`: keyof EventsDef, `value`: *number*): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
:------ | :------ |
`player` | *Player* |
`eventName` | keyof EventsDef |
`value` | *number* |

**Returns:** *void*

Defined in: [src/classes/PlayerStatisticsProvider.ts:165](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/196aade/src/classes/PlayerStatisticsProvider.ts#L165)

___

### subscribeToStatisticUpdates

▸ **subscribeToStatisticUpdates**(`statisticName`: keyof StatsDef, `handler`: (`player`: *Player*, `newValue`: *number*, `oldValue`: *number*) => *void*): ISignalConnection

**`inheritdoc`** 

#### Parameters:

Name | Type |
:------ | :------ |
`statisticName` | keyof StatsDef |
`handler` | (`player`: *Player*, `newValue`: *number*, `oldValue`: *number*) => *void* |

**Returns:** ISignalConnection

Defined in: [src/classes/PlayerStatisticsProvider.ts:216](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/196aade/src/classes/PlayerStatisticsProvider.ts#L216)

___

### waitForStatisticsToLoadForPlayer

▸ **waitForStatisticsToLoadForPlayer**(`player`: *Player*): *void*

Waits (yields current coroutine) until statistics have been loaded for the given player

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The given player    |

**Returns:** *void*

Implementation of: [IPlayerStatisticsProvider](../interfaces/iplayerstatisticsprovider.md)

Defined in: [src/classes/PlayerStatisticsProvider.ts:236](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/196aade/src/classes/PlayerStatisticsProvider.ts#L236)

___

### create

▸ `Static`**create**<StatsDef, EventsDef\>(`eventsDefinition`: EventsDef, `playerStatisticsPersistenceLayer`: [*IPlayerStatisticsPersistenceLayer*](../interfaces/iplayerstatisticspersistencelayer.md)<StatsDef\>, `statisticsDefinition`: StatsDef): [*IPlayerStatisticsProvider*](../interfaces/iplayerstatisticsprovider.md)<StatsDef, EventsDef\>

Creates a new instance

#### Type parameters:

Name | Type |
:------ | :------ |
`StatsDef` | [*StatisticsDefinition*](../README.md#statisticsdefinition) |
`EventsDef` | [*EventsDefinition*](../README.md#eventsdefinition)<StatsDef\> |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`eventsDefinition` | EventsDef | The events definition to use   |
`playerStatisticsPersistenceLayer` | [*IPlayerStatisticsPersistenceLayer*](../interfaces/iplayerstatisticspersistencelayer.md)<StatsDef\> | The persistence layer to use   |
`statisticsDefinition` | StatsDef | The statistics definition to use    |

**Returns:** [*IPlayerStatisticsProvider*](../interfaces/iplayerstatisticsprovider.md)<StatsDef, EventsDef\>

Defined in: [src/classes/PlayerStatisticsProvider.ts:89](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/196aade/src/classes/PlayerStatisticsProvider.ts#L89)
