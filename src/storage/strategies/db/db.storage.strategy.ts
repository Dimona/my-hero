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
import { PlayerSnapshot } from '@game/player/types/player.types';
import { PlayerEntity } from '@db-storage/entities/player.entity';
import { Player } from '@game/player/core/player';

@Injectable()
export class DbStorageStrategy implements IStorageStrategy {
  static readonly type = StorageStrategyType.DB;

  constructor(
    @InjectRepository(GameEntity) private readonly gameRepository: Repository<GameEntity>,
    @InjectRepository(PlayerEntity) private readonly playerRepository: Repository<PlayerEntity>,
  ) {}

  async saveGame(game: Game): Promise<void> {
    const entity = new GameEntity();
    entity.status = game.getStatus();
    entity.id = game.getUuid();
    entity.started_at = game.getStartedAt();

    await this.gameRepository.save(entity);
  }

  async restoreGame(uuid: Uuid): Promise<GameSnapshot> {
    try {
      const game = await this.gameRepository.findOneByOrFail({ id: uuid });

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

  async savePlayer(player: Player): Promise<void> {
    const entity = new PlayerEntity();
    entity.id = player.getUuid();
    entity.name = player.getName();
    entity.active_game_id = player.getActiveGameId();

    await this.playerRepository.save(entity);
  }

  async getPlayer(uuid: Uuid): Promise<PlayerSnapshot> {
    const player = await this.playerRepository.findOneBy({ id: uuid });

    return { uuid: player.id, activeGameId: player.active_game_id, name: player.name };
  }
}
