[@rbxts/player-statistics](../README.md) / IPlayerStatisticsPersistenceLayer

# Interface: IPlayerStatisticsPersistenceLayer<T\>

Provides an interface for a persistence layer for player statistics
Meant to allow for consumers to implement their own persistence layer to tie in with their game's persistence system

## Type parameters

Name | Type |
:------ | :------ |
`T` | [*StatisticsDefinition*](../README.md#statisticsdefinition) |

## Implemented by

* [*DataStorePlayerStatisticsPersistenceLayer*](../classes/datastoreplayerstatisticspersistencelayer.md)

## Table of contents

### Methods

- [loadStatisticsSnapshotForPlayerAsync](iplayerstatisticspersistencelayer.md#loadstatisticssnapshotforplayerasync)
- [saveStatisticsSnapshotForPlayerAsync](iplayerstatisticspersistencelayer.md#savestatisticssnapshotforplayerasync)

## Methods

### loadStatisticsSnapshotForPlayerAsync

▸ **loadStatisticsSnapshotForPlayerAsync**(`player`: *Player*): *Promise*<undefined \| Partial<[*StatisticsSnapshot*](../README.md#statisticssnapshot)<T\>\>\>

Loads a statistics snapshot for the given player. Should return undefined if default is desired.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The player to load the statistics snapshot for.    |

**Returns:** *Promise*<undefined \| Partial<[*StatisticsSnapshot*](../README.md#statisticssnapshot)<T\>\>\>

Defined in: [src/interfaces/IPlayerStatisticsPersistenceLayer.d.ts:13](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/196aade/src/interfaces/IPlayerStatisticsPersistenceLayer.d.ts#L13)

___

### saveStatisticsSnapshotForPlayerAsync

▸ **saveStatisticsSnapshotForPlayerAsync**(`player`: *Player*, `statisticsSnapshot`: [*StatisticsSnapshot*](../README.md#statisticssnapshot)<T\>): *Promise*<void\>

Saves a statistics snapshot for the given player.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`player` | *Player* | The player to save the statistics snapshot for.   |
`statisticsSnapshot` | [*StatisticsSnapshot*](../README.md#statisticssnapshot)<T\> | The statistics snapshot to save.    |

**Returns:** *Promise*<void\>

Defined in: [src/interfaces/IPlayerStatisticsPersistenceLayer.d.ts:20](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/196aade/src/interfaces/IPlayerStatisticsPersistenceLayer.d.ts#L20)
