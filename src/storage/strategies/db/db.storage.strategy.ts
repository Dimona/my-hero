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
import { HeroRoomEntity } from '@db-storage/entities/hero-room.entity';

@Injectable()
export class DbStorageStrategy implements IStorageStrategy {
  static readonly type = StorageStrategyType.DB;

  constructor(
    @InjectRepository(GameEntity) private readonly gameRepo: Repository<GameEntity>,
    @InjectRepository(PlayerEntity) private readonly playerRepo: Repository<PlayerEntity>,
    @InjectRepository(HeroEntity) private readonly heroRepo: Repository<HeroEntity>,
    @InjectRepository(CharacteristicsEntity) private readonly characteristicsRepo: Repository<CharacteristicsEntity>,
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

  async saveHero(game: Game): Promise<void> {
    const hero = game.getHero();
    if (!hero) {
      return;
    }
    const player = game.getPlayer();
    const heroEntity = new HeroEntity();
    heroEntity.id = hero.getUuid();
    heroEntity.name = hero.getName();
    heroEntity.race = hero.getRace();
    heroEntity.game_id = game.getUuid();
    heroEntity.player_id = player.getUuid();
    heroEntity.characteristics_id = hero.getState().getUuid();
    const characteristicsEntity = new CharacteristicsEntity();
    const characteristics = hero.getCharacteristics();
    characteristicsEntity.id = heroEntity.characteristics_id;
    characteristicsEntity.health = characteristics.health;
    characteristicsEntity.max_health = characteristics.maxHealth;
    characteristicsEntity.manna = characteristics.maxManna;
    characteristicsEntity.max_manna = characteristics.maxManna;
    characteristicsEntity.physical_attack = characteristics.physicalAttack;
    characteristicsEntity.physical_defense = characteristics.physicalDefense;
    characteristicsEntity.magical_attack = characteristics.magicalAttack;
    characteristicsEntity.magical_defense = characteristics.magicalDefense;

    heroEntity.characteristics = characteristicsEntity;

    const location = hero.getLocation();
    if (location) {
      heroEntity.x = location.x;
      heroEntity.y = location.y;
    }

    // Hero rooms
    const heroRoomEntities: HeroRoomEntity[] = [];
    const heroRooms = hero.getRooms();
    Object.values(heroRooms).forEach(heroRoom => {
      const heroRoomEntity = new HeroRoomEntity();
      heroRoomEntity.id = heroRoom.uuid;
      heroRoomEntity.status = heroRoom.status;
      heroRoomEntity.hero_id = hero.getUuid();
      heroRoomEntity.room_id = heroRoom.levelRoom.uuid;

      heroRoomEntities.push(heroRoomEntity);
    });
    heroEntity.rooms = heroRoomEntities;

    await this.heroRepo.save(heroEntity);
  }

  async saveGame(game: Game): Promise<void> {
    const gameEntity = new GameEntity();
    gameEntity.status = game.getStatus();
    gameEntity.id = game.getUuid();
    gameEntity.started_at = game.getStartedAt();
    await this.gameRepo.save(gameEntity);
    gameEntity.level = this.buildLevelRelation(game);

    await this.saveHero(game);

    await this.gameRepo.save(gameEntity);
  }

  async restoreGame(player: Player, uuid: Uuid): Promise<Snapshot.Game> {
    try {
      const game = await this.gameRepo.findOneOrFail({
        where: { id: uuid },
        relations: [
          'level',
          'level.rooms',
          'heroes',
          'heroes.characteristics',
          'heroes.rooms',
          'heroes.rooms.level_room',
        ],
      });
      const { heroes = [], level } = game;
      const { rooms = [] } = level || {};
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
              x: hero.x,
              y: hero.y,
              rooms: hero.rooms.map((room: HeroRoomEntity) => ({
                uuid: room.id,
                status: room.status,
                levelRoom: {
                  uuid: room.level_room.id,
                  x: room.level_room.x,
                  y: room.level_room.y,
                  walls: {
                    left: room.level_room.left_wall,
                    top: room.level_room.top_wall,
                    right: room.level_room.right_wall,
                    bottom: room.level_room.bottom_wall,
                  },
                },
              })),
              characteristics: {
                uuid: hero.characteristics.id,
                data: {
                  health: hero.characteristics.health,
                  maxHealth: hero.characteristics.max_health,
                  manna: hero.characteristics.manna,
                  maxManna: hero.characteristics.max_manna,
                  physicalAttack: hero.characteristics.physical_attack,
                  physicalDefense: hero.characteristics.physical_defense,
                  magicalAttack: hero.characteristics.magical_attack,
                  magicalDefense: hero.characteristics.magical_defense,
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

  async deleteGame(game: Game): Promise<void> {
    const characteristicsId = game.getHero().getState().getUuid();
    await this.gameRepo.delete({ id: game.getUuid() });
    await this.characteristicsRepo.delete({ id: characteristicsId });
  }
}
