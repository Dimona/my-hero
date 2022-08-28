import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameEvents } from '../../game/enums/game.enums';
import { GameEntity } from '../../storage/strategies/db/entities/game.entity';
import { Context } from '@context/context';

@Injectable()
export class ContextService {
  constructor(private readonly context: Context) {}

  @OnEvent(GameEvents.STARTED, { async: false })
  handleGameStarted(payload: GameEntity) {
    this.context.set('gameId', payload.id);
  }
}
