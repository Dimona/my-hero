import { GameStatus } from '@game/game.enums';
import { Uuid } from '@game/game.types';
import { Level } from "@game/level/level";
import { Hero } from "@game/hero/hero";
import { Player } from "@game/player/player";

export interface Creatable {
  create(...args: any): Promise<any>;
}

export interface Restorable {
  restore(...args: any): Promise<any>;
}

export interface IGame {
  getUuid(): Uuid;
  setStatus(status: GameStatus): this;
  getStatus(): GameStatus;
  setStartedAt(startedAt: Date): this;
  getStartedAt(): Date;
  setLevel(level: Level): this;
  getLevel(): Level;
  setHero(hero: Hero): this;
  getHero(): Hero;
  setPlayer(player: Player): this;
  getPlayer(): Player;
}
