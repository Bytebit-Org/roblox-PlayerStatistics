[@rbxts/player-statistics](../README.md) / DataStorePlayerStatisticsPersistenceLayer

# Class: DataStorePlayerStatisticsPersistenceLayer<StatsDef\>

The standard implementation of [IPlayerStatisticsPersistenceLayer](../interfaces/iplayerstatisticspersistencelayer.md) which stores player statistic snapshots a DataStore
and overwrites the previous snapshot on each save.

## Type parameters

Name | Type |
:------ | :------ |
`StatsDef` | [*StatisticsDefinition*](../README.md#statisticsdefinition) |

## Implements

* [*IPlayerStatisticsPersistenceLayer*](../interfaces/iplayerstatisticspersistencelayer.md)<StatsDef\>

## Table of contents

### Methods

- [loadStatisticsSnapshotForPlayerAsync](datastoreplayerstatisticspersistencelayer.md#loadstatisticssnapshotforplayerasync)
- [saveStatisticsSnapshotForPlayerAsync](datastoreplayerstatisticspersistencelayer.md#savestatisticssnapshotforplayerasync)
- [create](datastoreplayerstatisticspersistencelayer.md#create)

## Methods

### loadStatisticsSnapshotForPlayerAsync

▸ **loadStatisticsSnapshotForPlayerAsync**(`player`: *Player*): *Promise*<undefined \| object\>

Loads a statistics snapshot for the given player. Should return undefined if default is desired.

#### Parameters:

Name | Type |
:------ | :------ |
`player` | *Player* |

**Returns:** *Promise*<undefined \| object\>

Implementation of: [IPlayerStatisticsPersistenceLayer](../interfaces/iplayerstatisticspersistencelayer.md)

Defined in: [src/classes/PersistenceLayers/DataStorePlayerStatisticsPersistenceLayer.ts:32](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PersistenceLayers/DataStorePlayerStatisticsPersistenceLayer.ts#L32)

___

### saveStatisticsSnapshotForPlayerAsync

▸ **saveStatisticsSnapshotForPlayerAsync**(`player`: *Player*, `statisticsSnapshot`: [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\>): *Promise*<void\>

Saves a statistics snapshot for the given player.

#### Parameters:

Name | Type |
:------ | :------ |
`player` | *Player* |
`statisticsSnapshot` | [*StatisticsSnapshot*](../README.md#statisticssnapshot)<StatsDef\> |

**Returns:** *Promise*<void\>

Implementation of: [IPlayerStatisticsPersistenceLayer](../interfaces/iplayerstatisticspersistencelayer.md)

Defined in: [src/classes/PersistenceLayers/DataStorePlayerStatisticsPersistenceLayer.ts:49](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PersistenceLayers/DataStorePlayerStatisticsPersistenceLayer.ts#L49)

___

### create

▸ `Static`**create**<StatsDef\>(`dataStore`: *GlobalDataStore*): [*IPlayerStatisticsPersistenceLayer*](../interfaces/iplayerstatisticspersistencelayer.md)<StatsDef\>

Creates a new instance

#### Type parameters:

Name | Type |
:------ | :------ |
`StatsDef` | [*StatisticsDefinition*](../README.md#statisticsdefinition) |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dataStore` | *GlobalDataStore* | The data store to use    |

**Returns:** [*IPlayerStatisticsPersistenceLayer*](../interfaces/iplayerstatisticspersistencelayer.md)<StatsDef\>

Defined in: [src/classes/PersistenceLayers/DataStorePlayerStatisticsPersistenceLayer.ts:25](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/810ee13/src/classes/PersistenceLayers/DataStorePlayerStatisticsPersistenceLayer.ts#L25)
