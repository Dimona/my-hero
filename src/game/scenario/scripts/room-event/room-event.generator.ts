import { IRoomEventScript, IRoomEvent } from '@game/scenario/scripts/room-event/room-event.interfaces';
import { Injectable } from '@nestjs/common';
import { Context } from '@context/context';
import { Game } from '@game/game';
import { ManualRewardRoomEventScript } from '@game/scenario/scripts/room-event/manual-reward/manual-reward.room-event.script';
import { AutoRewardRoomEventScript } from '@game/scenario/scripts/room-event/auto-reward/auto-reward.room-event.script';
import { AutoTrapRoomEventScript } from '@game/scenario/scripts/room-event/auto-trap/auto-trap.room-event.script';

@Injectable()
export class RoomEventGenerator {
  constructor(
    private readonly context: Context,
    private readonly manualPriceRoomEventScript: ManualRewardRoomEventScript,
    private readonly autoRewardRoomEventScript: AutoRewardRoomEventScript,
    private readonly autoTrapRoomEventScript: AutoTrapRoomEventScript,
  ) {}

  private readonly config: { script: IRoomEventScript; prob: number }[] = [
    { script: this.manualPriceRoomEventScript, prob: 0.4 },
    { script: this.autoRewardRoomEventScript, prob: 0.4 },
    { script: this.autoTrapRoomEventScript, prob: 0.2 },
  ];

  private getRandomScript(): IRoomEventScript {
    const input = Math.random();
    let threshold = 0;
    for (let i = 0; i < this.config.length; i++) {
      threshold += this.config[i].prob;
      if (threshold > input) {
        return this.config[i].script;
      }
    }
  }

  generateEvent(): IRoomEventScript {
    const game = this.context.get<Game>('game');

    return this.getRandomScript();
  }
}
