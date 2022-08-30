import { Injectable } from '@nestjs/common';
import { Creatable, Restorable } from '@game/game.interfaces';
import { Level } from '@game/level/level';
import { GameEvent } from '@game/game.enums';
import { Game } from '@game/game';
import { InjectStorage } from '@storage/storage.inject.decorator';
import { Storage } from '@storage/storage';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Context } from '@context/context';
import { LevelEvent } from '@game/level/level.enums';
import { Snapshot } from '@storage/storage.types';
import { LevelGenerator } from '@game/level/level.generator';
import { LevelRooms } from '@game/level/level.types';

@Injectable()
export class LevelService implements Creatable, Restorable {
  constructor(@InjectStorage() private readonly storage: Storage, private readonly eventEmitter: EventEmitter2) {}

  async create(game: Game, params?: { width: number; height: number }) {
    const level = LevelGenerator.generate(params);

    game.setLevel(level);

    await this.eventEmitter.emitAsync(LevelEvent.CREATED, game);

    return level;
  }

  restoreRooms(levelSnapshot: Snapshot.Level): LevelRooms {
    const levelRooms: LevelRooms = {};
    levelSnapshot.rooms.forEach(roomSnapshot => {
      levelRooms[`${roomSnapshot.x}|${roomSnapshot.y}`] = {
        uuid: roomSnapshot.uuid,
        x: roomSnapshot.x,
        y: roomSnapshot.y,
        walls: roomSnapshot.walls,
      };
    });

    return levelRooms;
  }

  async restore(game: Game, levelSnapshot: Snapshot.Level): Promise<Level> {
    const level = Level.create({ uuid: levelSnapshot.uuid, name: levelSnapshot.name });
    level.setRooms(this.restoreRooms(levelSnapshot));
    game.setLevel(level);

    await this.eventEmitter.emitAsync(LevelEvent.RESTORED, game);

    return level;
  }
}
