import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Player } from '@game/player/core/player';
import { PlayerEvents } from '@game/player/enums/player.enums';
import { Uuid } from '@game/types/game.types';
import { InjectStorage } from '@storage/decorators/storage.inject.decorator';
import { Storage } from '@storage/core/storage';
import { Context } from '@context/context';
import { GameEvents } from '@game/enums/game.enums';
import { Game } from '@game/core/game';
import { StorageEvents } from '@storage/enums/storage.enums';

@Injectable()
export class PlayerService {
  constructor(
    @InjectStorage() private readonly storage: Storage,
    private readonly eventEmitter: EventEmitter2,
    private readonly context: Context,
  ) {}

  async create(name: string): Promise<Player> {
    const player = Player.create({ name });

    await this.eventEmitter.emitAsync(PlayerEvents.UPSERTED, player);

    return player;
  }

  async restore(uuid: Uuid): Promise<Player | null> {
    const playerSnapshot = await this.storage.getPlayer(uuid);

    if (!playerSnapshot) {
      return null;
    }

    const player = Player.create({ uuid, name: playerSnapshot.name });
    player.setActiveGameId(playerSnapshot.activeGameId);

    await this.eventEmitter.emitAsync(PlayerEvents.RESTORED, player);

    return player;
  }

  @OnEvent(GameEvents.STARTED, { async: false })
  async handleGameStarted(payload: Game): Promise<void> {
    console.log('handleGameStarted');
    const player = this.context.get<Player>('player');
    player.setActiveGameId(payload.getUuid());

    await this.eventEmitter.emitAsync(PlayerEvents.UPSERTED, player);
  }
}
