import { Game } from '@game/core/game';
import { Player } from '@game/player/core/player';

export type ContextStorage = {
  game?: Game;
  player?: Player;
};
