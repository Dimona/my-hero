import { Game } from '@game/game';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from '@db-storage/entities/game.entity';
import { Repository } from 'typeorm';
import { IStorageStrategy } from '@storage/storage.interfaces';
import { StorageStrategyType } from '@storage/storage.enums';
import { Uuid } from '@game/game.types';
import { StorageGameNotFoundError } from '@storage/errors/storage.game.not-found.error';
import { PlayerEntity } from '@db-storage/entities/player.entity';
import { Player } from '@game/player/player';
import { Snapshot } from '@storage/storage.types';
import { LevelEntity } from '@db-storage/entities/level.entity';
import { LevelRoomEntity } from '@db-storage/entities/level-room.entity';

@Injectable()
export class DbStorageStrategy implements IStorageStrategy {
  static readonly type = StorageStrategyType.DB;

  constructor(
    @InjectRepository(GameEntity) private readonly gameRepository: Repository<GameEntity>,
    @InjectRepository(PlayerEntity) private readonly playerRepository: Repository<PlayerEntity>,
  ) {}

  async saveGame(game: Game): Promise<void> {
    const gameEntity = new GameEntity();
    gameEntity.status = game.getStatus();
    gameEntity.id = game.getUuid();
    gameEntity.started_at = game.getStartedAt();
    const level = game.getLevel();
    if (level) {
      const levelEntity = new LevelEntity();
      levelEntity.id = level.getUuid();
      levelEntity.name = level.getName();
      levelEntity.game_id = game.getUuid();
      const rooms = [];
      for (const [, room] of Object.entries(level.getRooms() || {})) {
        const levelRoomEntity = new LevelRoomEntity();
        levelRoomEntity.id = room.uuid;
        levelRoomEntity.x = room.x;
        levelRoomEntity.y = room.y;
        levelRoomEntity.left_wall = room.walls.left;
        levelRoomEntity.top_wall = room.walls.top;
        levelRoomEntity.right_wall = room.walls.right;
        levelRoomEntity.bottom_wall = room.walls.bottom;
        rooms.push(levelRoomEntity);
      }
      levelEntity.rooms = rooms;
      gameEntity.level = levelEntity;
    }

    await this.gameRepository.save(gameEntity);
  }

  async restoreGame(uuid: Uuid): Promise<Snapshot.Game> {
    try {
      const game = await this.gameRepository.findOneOrFail({
        where: { id: uuid },
        relations: ['level', 'level.rooms'],
      });

      return {
        uuid: game.id,
        startedAt: game.started_at,
        status: game.status,
        level: game.level
          ? {
              uuid: game.level.id,
              name: game.level.name,
              createdAt: game.level.created_at,
              rooms: game.level.rooms.map(room => ({
                uuid: room.id,
                x: room.x,
                y: room.y,
                walls: {
                  left: room.left_wall,
                  top: room.top_wall,
                  right: room.right_wall,
                  bottom: room.bottom_wall,
                },
              })),
            }
          : null,
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

  async getPlayer(uuid: Uuid): Promise<Snapshot.Player | null> {
    const player = await this.playerRepository.findOneBy({ id: uuid });

    if (!player) {
      return null;
    }

    return { uuid: player.id, activeGameId: player.active_game_id, name: player.name };
  }
}
