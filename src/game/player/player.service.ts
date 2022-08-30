import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Player } from '@game/player/player';
import { PlayerEvent } from '@game/player/player.enums';
import { Uuid } from '@game/game.types';
import { InjectStorage } from '@storage/storage.inject.decorator';
import { Storage } from '@storage/storage';
import { Context } from '@context/context';
import { GameEvent } from '@game/game.enums';
import { Game } from '@game/game';
import { Creatable, Restorable } from '@game/game.interfaces';

@Injectable()
export class PlayerService implements Creatable, Restorable {
  constructor(
    @InjectStorage() private readonly storage: Storage,
    private readonly eventEmitter: EventEmitter2,
    private readonly context: Context,
  ) {}

  async create(name: string): Promise<Player> {
    const player = Player.create({ name });

    await this.eventEmitter.emitAsync(PlayerEvent.UPSERTED, player);

    return player;
  }

  async restore(uuid: Uuid): Promise<Player | null> {
    const playerSnapshot = await this.storage.getPlayer(uuid);

    if (!playerSnapshot) {
      return null;
    }

    const player = Player.create({ uuid, name: playerSnapshot.name });
    player.setActiveGameId(playerSnapshot.activeGameId);

    await this.eventEmitter.emitAsync(PlayerEvent.RESTORED, player);

    return player;
  }

  @OnEvent(GameEvent.STARTED, { async: false })
  async handleGameStarted(payload: Game): Promise<void> {
    const player = this.context.get<Player>('player');
    player.setActiveGameId(payload.getUuid());

    await this.eventEmitter.emitAsync(PlayerEvent.UPSERTED, player);
  }
}
