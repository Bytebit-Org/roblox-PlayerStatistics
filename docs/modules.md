[@rbxts/player-statistics](README.md) / Exports

# @rbxts/player-statistics

## Table of contents

### Classes

- [DataStorePlayerStatisticsPersistenceLayer](classes/datastoreplayerstatisticspersistencelayer.md)
- [PlayerStatisticsProvider](classes/playerstatisticsprovider.md)

### Interfaces

- [IPlayerStatisticEventsPoster](interfaces/iplayerstatisticeventsposter.md)
- [IPlayerStatisticsLoader](interfaces/iplayerstatisticsloader.md)
- [IPlayerStatisticsPersistenceLayer](interfaces/iplayerstatisticspersistencelayer.md)
- [IPlayerStatisticsProvider](interfaces/iplayerstatisticsprovider.md)
- [IPlayerStatisticsReader](interfaces/iplayerstatisticsreader.md)

### Type aliases

- [EventsDefinition](modules.md#eventsdefinition)
- [StatisticsDefinition](modules.md#statisticsdefinition)
- [StatisticsSnapshot](modules.md#statisticssnapshot)

### Variables

- [StandardStatisticUpdateFunctions](modules.md#standardstatisticupdatefunctions)

## Type aliases

### EventsDefinition

Ƭ **EventsDefinition**<T\>: *object*

Defines a list of events, keyed by their string name

#### Type parameters:

Name | Type |
:------ | :------ |
`T` | [*StatisticsDefinition*](modules.md#statisticsdefinition) |

#### Type declaration:

Defined in: [src/types/EventsDefinition.d.ts:6](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/types/EventsDefinition.d.ts#L6)

___

### StatisticsDefinition

Ƭ **StatisticsDefinition**: *object*

Defines a list of statistics, keyed by their string name

#### Type declaration:

Defined in: [src/types/StatisticsDefinition.d.ts:4](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/types/StatisticsDefinition.d.ts#L4)

___

### StatisticsSnapshot

Ƭ **StatisticsSnapshot**<T\>: { readonly[S in keyof T]: number}

A snapshot of statistics for a given player as per a definition of statistics

#### Type parameters:

Name | Type |
:------ | :------ |
`T` | [*StatisticsDefinition*](modules.md#statisticsdefinition) |

Defined in: [src/types/StatisticsSnapshot.d.ts:6](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/types/StatisticsSnapshot.d.ts#L6)

## Variables

### StandardStatisticUpdateFunctions

• `Const` **StandardStatisticUpdateFunctions**: *object*

A set of handy, common update functions for statistics

#### Type declaration:

Name | Type |
:------ | :------ |
`increment` | (`\_`: *number*, `currentValue`: *number*) => *number* |
`sum` | (`a`: *number*, `b`: *number*) => *number* |

Defined in: [src/StandardStatisticUpdateFunctions.ts:4](https://github.com/Bytebit-Org/roblox-PlayerStatistics/blob/bf8f327/src/StandardStatisticUpdateFunctions.ts#L4)
