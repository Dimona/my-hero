import { ClassConstructor } from 'class-transformer';
import { IStorageStrategy } from '../interfaces/storage.interfaces';
import { StorageStrategyType } from '../enums/storage.enums';
import { Uuid } from '@game/types/game.types';
import { GameStatus } from '@game/enums/game.enums';

export type StorageStrategyTyped = ClassConstructor<IStorageStrategy> & { type: StorageStrategyType };

export type GameSnapshot = {
  uuid: Uuid;
  startedAt: Date;
  status: GameStatus;
};
