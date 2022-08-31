import { Uuid } from '@game/game.types';
import { IGame } from '@game/game.interfaces';
import { GameStatus } from '@game/game.enums';
import { Utils } from '@common/utils';
import { Level } from '@game/level/level';
import { Hero } from '@game/hero/hero';
import { Player } from './player/player';

export class Game implements IGame {
  private player: Player;

  private readonly uuid: Uuid;

  private status: GameStatus = GameStatus.PENDING_START;

  private startedAt: Date;

  private level: Level;

  private hero: Hero;

  private constructor(uuid?: Uuid) {
    this.uuid = uuid || Utils.generateUuid();
  }

  setPlayer(player: Player): this {
    this.player = player;

    return this;
  }

  getPlayer(): Player {
    return this.player;
  }

  getUuid(): Uuid {
    return this.uuid;
  }

  getStatus(): GameStatus {
    return this.status;
  }

  setStatus(status: GameStatus): this {
    this.status = status;

    return this;
  }

  getStartedAt(): Date {
    return this.startedAt;
  }

  setStartedAt(startedAt: Date): this {
    this.startedAt = startedAt;

    return this;
  }

  getLevel(): Level {
    return this.level;
  }

  setLevel(level: Level): this {
    this.level = level;

    return this;
  }

  static create(uuid?: Uuid): Game {
    return new Game(uuid);
  }

  getHero(): Hero {
    return this.hero;
  }

  setHero(hero: Hero): this {
    this.hero = hero;

    return this;
  }
}
