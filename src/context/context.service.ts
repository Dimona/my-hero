import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameEvent } from '@game/game.enums';
import { Context } from '@context/context';
import { PlayerEvent } from '@game/player/player.enums';
import { Player } from '@game/player/player';
import { Game } from '@game/game';

@Injectable()
export class ContextService {
  constructor(private readonly context: Context) {}

  @OnEvent(GameEvent.STARTED, { async: false })
  handleGameStarted(payload: Game): void {
    this.context.set('game', payload);
  }

  @OnEvent(GameEvent.RESTORED, { async: false })
  handleGameRestored(payload: Game): void {
    this.context.set('game', payload);
  }

  @OnEvent(PlayerEvent.RESTORED, { async: false })
  async handlePlayerRestored(payload: Player): Promise<void> {
    this.context.set('player', payload);
  }

  @OnEvent(PlayerEvent.UPSERTED, { async: false })
  async handlePlayerUpserted(payload: Player): Promise<void> {
    this.context.set('player', payload);
  }
}
