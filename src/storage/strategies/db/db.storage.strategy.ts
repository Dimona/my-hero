import { Game } from '@game/core/game';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from '@db-storage/entities/game.entity';
import { Repository } from 'typeorm';
import { IStorageStrategy } from '@storage/interfaces/storage.interfaces';
import { StorageStrategyType } from '@storage/enums/storage.enums';
import { Uuid } from '@game/types/game.types';
import { GameSnapshot } from '@storage/types/storage.types';
import { StorageGameNotFoundError } from '@storage/errors/storage.game.not-found.error';

@Injectable()
export class DbStorageStrategy implements IStorageStrategy {
  static readonly type = StorageStrategyType.DB;

  constructor(@InjectRepository(GameEntity) private readonly gameEntityRepository: Repository<GameEntity>) {}

  async saveGame(game: Game): Promise<void> {
    const entity = new GameEntity();
    entity.status = game.getStatus();
    entity.id = game.getUuid();
    entity.started_at = game.getStartedAt();

    await this.gameEntityRepository.save(entity);
  }

  async restoreGame(uuid: Uuid): Promise<GameSnapshot> {
    try {
      const game = await this.gameEntityRepository.findOneOrFail({ where: { id: uuid } });

      return {
        uuid: game.id,
        startedAt: game.started_at,
        status: game.status,
      };
    } catch (err) {
      Logger.error(err.message);
      throw new StorageGameNotFoundError();
    }
  }
}
