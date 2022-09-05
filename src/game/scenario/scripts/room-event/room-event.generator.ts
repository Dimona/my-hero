import { IRoomEventScript } from '@game/scenario/scripts/room-event/room-event.interfaces';
import { Injectable } from '@nestjs/common';
import { Context } from '@context/context';
import { ManualRewardRoomEventScript } from '@game/scenario/scripts/room-event/manual-reward/manual-reward.room-event.script';
import { AutoRewardRoomEventScript } from '@game/scenario/scripts/room-event/auto-reward/auto-reward.room-event.script';
import { AutoTrapRoomEventScript } from '@game/scenario/scripts/room-event/auto-trap/auto-trap.room-event.script';
import { BattleScript } from '@game/scenario/scripts/room-event/battle/battle.script';
import { Utils } from '@common/utils';
import { ProbabilityConfig } from '@common/types';

@Injectable()
export class RoomEventGenerator {
  constructor(
    private readonly context: Context,
    private readonly manualPriceRoomEventScript: ManualRewardRoomEventScript,
    private readonly autoRewardRoomEventScript: AutoRewardRoomEventScript,
    private readonly autoTrapRoomEventScript: AutoTrapRoomEventScript,
    private readonly battleScript: BattleScript,
  ) {}

  private readonly config: ProbabilityConfig<IRoomEventScript> = [
    { value: this.manualPriceRoomEventScript, prob: 0.3 },
    { value: this.autoRewardRoomEventScript, prob: 0.3 },
    { value: this.autoTrapRoomEventScript, prob: 0.15 },
    { value: this.battleScript, prob: 0.25 },
  ];

  generateEvent(): IRoomEventScript {
    return Utils.getRandomFromArrayByProbability(this.config);
  }
}
