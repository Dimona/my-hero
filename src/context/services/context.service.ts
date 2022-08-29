import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameEvents } from '@game/enums/game.enums';
import { Context } from '@context/context';
import { PlayerEvents } from '@game/player/enums/player.enums';
import { Player } from '@game/player/core/player';
import { Game } from '@game/core/game';

@Injectable()
export class ContextService {
  constructor(private readonly context: Context) {}

  @OnEvent(GameEvents.STARTED, { async: false })
  handleGameStarted(payload: Game): void {
    this.context.set('gameId', payload);
  }

  @OnEvent(PlayerEvents.RESTORED, { async: false })
  async handlePlayerRestored(payload: Player): Promise<void> {
    console.log('handlePlayerRestored');
    this.context.set('player', payload);
  }

  @OnEvent(PlayerEvents.UPSERTED, { async: false })
  async handlePlayerUpserted(payload: Player): Promise<void> {
    console.log('handlePlayerUpserted');
    this.context.set('player', payload);
  }
}
