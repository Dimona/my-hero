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
import { HeroEntity } from '@db-storage/entities/hero.entity';
import { CharacteristicsEntity } from '@db-storage/entities/characteristics.entity';

@Injectable()
export class DbStorageStrategy implements IStorageStrategy {
  static readonly type = StorageStrategyType.DB;

  constructor(
    @InjectRepository(GameEntity) private readonly gameRepo: Repository<GameEntity>,
    @InjectRepository(PlayerEntity) private readonly playerRepo: Repository<PlayerEntity>,
    @InjectRepository(HeroEntity) private readonly heroRepo: Repository<HeroEntity>,
  ) {}

  private buildLevelRelation(game: Game): LevelEntity {
    let result;

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
      result = levelEntity;
    }

    return result;
  }

  private async saveHero(game: Game): Promise<void> {
    const hero = game.getHero();
    const player = game.getPlayer();
    const heroEntity = new HeroEntity();
    heroEntity.id = hero.getUuid();
    heroEntity.name = hero.getName();
    heroEntity.race = hero.getRace();
    heroEntity.game_id = game.getUuid();
    heroEntity.player_id = player.getUuid();
    heroEntity.characteristics_id = hero.getState().getUuid();
    const characteristicsEntity = new CharacteristicsEntity();
    const characteristics = hero.geCharacteristics();
    characteristicsEntity.id = heroEntity.characteristics_id;
    characteristicsEntity.health = characteristics.health;
    characteristicsEntity.max_health = characteristics.maxHealth;
    characteristicsEntity.manna = characteristics.maxManna;
    characteristicsEntity.max_manna = characteristics.maxManna;
    characteristicsEntity.physical_attack = characteristics.physicalAttack;
    characteristicsEntity.physical_defence = characteristics.physicalDefence;
    characteristicsEntity.magical_attack = characteristics.magicalAttack;
    characteristicsEntity.magical_defence = characteristics.magicalDefence;

    heroEntity.characteristics = characteristicsEntity;

    await this.heroRepo.save(heroEntity);
  }

  async saveGame(game: Game): Promise<void> {
    const gameEntity = new GameEntity();
    gameEntity.status = game.getStatus();
    gameEntity.id = game.getUuid();
    gameEntity.started_at = game.getStartedAt();
    gameEntity.level = this.buildLevelRelation(game);

    await this.saveHero(game);

    await this.gameRepo.save(gameEntity);
  }

  async restoreGame(player: Player, uuid: Uuid): Promise<Snapshot.Game> {
    try {
      const game = await this.gameRepo.findOneOrFail({
        where: { id: uuid },
        relations: ['level', 'level.rooms', 'heroes', 'heroes.characteristics'],
      });
      const {
        heroes = [],
        level,
        level: { rooms = [] },
      } = game;
      const hero = heroes.find(_hero => _hero.player_id === player.getUuid());

      return {
        uuid: game.id,
        startedAt: game.started_at,
        status: game.status,
        level: level
          ? {
              uuid: level.id,
              name: level.name,
              createdAt: level.created_at,
              rooms: rooms.map(room => ({
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
        hero: hero
          ? {
              name: hero.name,
              race: hero.race,
              uuid: hero.id,
              characteristics: {
                uuid: hero.characteristics.id,
                data: {
                  health: hero.characteristics.health,
                  maxHealth: hero.characteristics.max_health,
                  manna: hero.characteristics.manna,
                  maxManna: hero.characteristics.max_manna,
                  physicalAttack: hero.characteristics.physical_attack,
                  physicalDefence: hero.characteristics.physical_defence,
                  magicalAttack: hero.characteristics.magical_attack,
                  magicalDefence: hero.characteristics.magical_defence,
                },
              },
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

    await this.playerRepo.save(entity);
  }

  async getPlayer(uuid: Uuid): Promise<Snapshot.Player | null> {
    const player = await this.playerRepo.findOneBy({ id: uuid });

    if (!player) {
      return null;
    }

    return { uuid: player.id, activeGameId: player.active_game_id, name: player.name };
  }
}
