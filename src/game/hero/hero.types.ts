import { Race } from '@game/hero/hero.enums';
import { Uuid } from '@game/game.types';

export type HeroCreateParams = {
  uuid?: Uuid;
  name: string;
  race: Race;
};
