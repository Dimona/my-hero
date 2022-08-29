import { Injectable } from '@nestjs/common';
import { Creatable, Restorable } from '@game/interfaces/game.interfaces';
import { Level } from '@game/level/core/level';
import { GameEvent } from '@game/enums/game.enums';
import { Game } from '@game/core/game';
import { InjectStorage } from '@storage/decorators/storage.inject.decorator';
import { Storage } from '@storage/core/storage';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Context } from '@context/context';
import { LevelEvent } from '@game/level/enums/level.enums';
import { Snapshot } from '@storage/types/storage.types';
import { LevelGenerator } from '@game/level/generator/level.generator';

@Injectable()
export class LevelService implements Creatable, Restorable {
  constructor(@InjectStorage() private readonly storage: Storage, private readonly eventEmitter: EventEmitter2) {}

  async create(game: Game, params?: { width: number; height: number }) {
    const level = LevelGenerator.generate(params);

    game.setLevel(level);

    await this.eventEmitter.emitAsync(LevelEvent.CREATED, game);

    return level;
  }

  async restore(game: Game, levelSnapshot: Snapshot.Level): Promise<Level> {
    const level = Level.create({ uuid: levelSnapshot.uuid, name: levelSnapshot.name });
    game.setLevel(level);

    await this.eventEmitter.emitAsync(LevelEvent.RESTORED, game);

    return level;
  }
}
