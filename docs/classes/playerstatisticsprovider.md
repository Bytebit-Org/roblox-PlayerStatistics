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

- [currentStatisticsSnapshotsByPlayer](playerstatisticsprovider.md#currentstatisticssnapshotsbyplayer)
- [dataModel](playerstatisticsprovider.md#datamodel)
- [dumpster](playerstatisticsprovider.md#dumpster)
- [eventsDefinition](playerstatisticsprovider.md#eventsdefinition)
- [isDestroyed](playerstatisticsprovider.md#isdestroyed)
- [playerStatisticsPersistenceLayer](playerstatisticsprovider.md#playerstatisticspersistencelayer)
- [playersService](playerstatisticsprovider.md#playersservice)
- [signalFactory](playerstatisticsprovider.md#signalfactory)
- [statisticUpdatedSignalsByStatisticName](playerstatisticsprovider.md#statisticupdatedsignalsbystatisticname)
- [statisticsDefinition](playerstatisticsprovider.md#statisticsdefinition)
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

### currentStatisticsSnapshotsByPlayer

• `Protected` `Readonly` **currentStatisticsSnapshotsByPlayer**: *Map*<Player, [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>\>

Defined in: [src/classes/PlayerStatisticsProvider.ts:40](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L40)

___

### dataModel

• `Protected` `Readonly` **dataModel**: *DataModel*

___

### dumpster

• `Protected` `Readonly` **dumpster**: *Dumpster*

Defined in: [src/classes/PlayerStatisticsProvider.ts:41](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L41)

___

### eventsDefinition

• `Protected` `Readonly` **eventsDefinition**: EventsDef

___

### isDestroyed

• `Protected` **isDestroyed**: *boolean*

Defined in: [src/classes/PlayerStatisticsProvider.ts:42](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L42)

___

### playerStatisticsPersistenceLayer

• `Protected` `Readonly` **playerStatisticsPersistenceLayer**: [*IPlayerStatisticsPersistenceLayer*](../interfaces/iplayerstatisticspersistencelayer.md)<StatsDef\>

___

### playersService

• `Protected` `Readonly` **playersService**: *Players*

___

### signalFactory

• `Protected` `Readonly` **signalFactory**: *SignalFactory*

___

### statisticUpdatedSignalsByStatisticName

• `Protected` `Readonly` **statisticUpdatedSignalsByStatisticName**: *Map*<keyof StatsDef, ISignal<(`player`: *Player*, `newValue`: *number*, `oldValue`: *number*) => *void*\>\>

Defined in: [src/classes/PlayerStatisticsProvider.ts:43](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L43)

___

### statisticsDefinition

• `Protected` `Readonly` **statisticsDefinition**: StatsDef

___

### statisticsLoadedForPlayer

• `Readonly` **statisticsLoadedForPlayer**: *ISignal*<(`player`: *Player*) => *void*\>

Fired when statistics are loaded for a player

Implementation of: [IPlayerStatisticsProvider](../interfaces/iplayerstatisticsprovider.md).[statisticsLoadedForPlayer](../interfaces/iplayerstatisticsprovider.md#statisticsloadedforplayer)

Defined in: [src/classes/PlayerStatisticsProvider.ts:36](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L36)

## Methods

### areStatisticsLoadedForPlayer

▸ **areStatisticsLoadedForPlayer**(`player`: *Player*): *boolean*

Returns whether statistics have been loaded for the given player

#### Parameters:

Name | Type |
:------ | :------ |
`player` | *Player* |

**Returns:** *boolean*

Implementation of: [IPlayerStatisticsProvider](../interfaces/iplayerstatisticsprovider.md)

Defined in: [src/classes/PlayerStatisticsProvider.ts:105](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L105)

___

### destroy

▸ **destroy**(): *void*

Clean up everything

**Returns:** *void*

Implementation of: [IPlayerStatisticsProvider](../interfaces/iplayerstatisticsprovider.md)

Defined in: [src/classes/PlayerStatisticsProvider.ts:113](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L113)

___

### getStatisticValueForPlayer

▸ **getStatisticValueForPlayer**(`player`: *Player*, `statisticName`: keyof StatsDef): [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>[keyof StatsDef]

#### Parameters:

Name | Type |
:------ | :------ |
`player` | *Player* |
`statisticName` | keyof StatsDef |

**Returns:** [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>[keyof StatsDef]

Defined in: [src/classes/PlayerStatisticsProvider.ts:136](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L136)

___

### getStatisticsSnapshotForPlayer

▸ **getStatisticsSnapshotForPlayer**(`player`: *Player*): [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>

Gets the current statistics snapshot for the given player

#### Parameters:

Name | Type |
:------ | :------ |
`player` | *Player* |

**Returns:** [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>

Implementation of: [IPlayerStatisticsProvider](../interfaces/iplayerstatisticsprovider.md)

Defined in: [src/classes/PlayerStatisticsProvider.ts:123](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L123)

___

### recordEvent

▸ **recordEvent**(`player`: *Player*, `eventName`: keyof EventsDef, `value`: *number*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`player` | *Player* |
`eventName` | keyof EventsDef |
`value` | *number* |

**Returns:** *void*

Defined in: [src/classes/PlayerStatisticsProvider.ts:149](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L149)

___

### subscribeToStatisticUpdates

▸ **subscribeToStatisticUpdates**(`statisticName`: keyof StatsDef, `handler`: (`player`: *Player*, `newValue`: *number*, `oldValue`: *number*) => *void*): ISignalConnection

#### Parameters:

Name | Type |
:------ | :------ |
`statisticName` | keyof StatsDef |
`handler` | (`player`: *Player*, `newValue`: *number*, `oldValue`: *number*) => *void* |

**Returns:** ISignalConnection

Defined in: [src/classes/PlayerStatisticsProvider.ts:197](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L197)

___

### waitForStatisticsToLoadForPlayer

▸ **waitForStatisticsToLoadForPlayer**(`player`: *Player*): *void*

Waits (yields current coroutine) until statistics have been loaded for the given player

#### Parameters:

Name | Type |
:------ | :------ |
`player` | *Player* |

**Returns:** *void*

Implementation of: [IPlayerStatisticsProvider](../interfaces/iplayerstatisticsprovider.md)

Defined in: [src/classes/PlayerStatisticsProvider.ts:214](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L214)

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

Defined in: [src/classes/PlayerStatisticsProvider.ts:88](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PlayerStatisticsProvider.ts#L88)
