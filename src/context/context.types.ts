import { Game } from '@game/game';
import { Player } from '@game/player/player';

export type ContextStorage = {
  game?: Game;
  player?: Player;
};
