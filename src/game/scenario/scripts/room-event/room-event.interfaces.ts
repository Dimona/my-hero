import { IScript } from '@game/scenario/scenario.interfaces';
import { Hero } from '@game/hero/hero';

export interface IRoomEventScript extends IScript {}

export interface IRoomEvent extends IRoomEventScript {
  getHero(): Hero;
  getScript(): IRoomEventScript;
}
