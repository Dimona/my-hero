import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { Context } from '@context/context';
import { Game } from '@game/game';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InquirerService } from 'nest-commander';
import { IRoomEventScript } from '@game/scenario/scripts/room-event/room-event.interfaces';
import {
  ROOM_EVENT_REWARD,
  ROOM_EVENT_REWARD_QS,
  RoomEventRewardParams,
} from '@game/scenario/scripts/room-event/reward/reward.questions';
import { InjectScenario } from '@game/scenario/scenario.inject.decorator';
import { ScriptCollection } from '@game/scenario/script.collection';
import { RoomEventEvent } from '@game/scenario/scripts/room-event/room-event.enums';
import { AUTO_REWARD } from '@game/scenario/scripts/room-event/reward/reward.constants';
import { RoomEventCompleteScript } from '@game/scenario/scripts/room-event/room-event.complete.script';

@Injectable()
export class ManualRewardRoomEventScript implements IRoomEventScript {
  constructor(
    private readonly context: Context,
    private readonly eventEmitter: EventEmitter2,
    private readonly inquirer: InquirerService,
    @InjectScenario() private readonly scenario: ScriptCollection,
    @Inject(forwardRef(() => RoomEventCompleteScript))
    private readonly roomEventCompleteScript: RoomEventCompleteScript,
  ) {}

  async run(): Promise<void> {
    Logger.warn(`You are entering the room but it's empty`, null, { timestamp: false });
    Logger.warn(`You found magical device which will give you award by your choice\n\n`, null, { timestamp: false });

    const { roomEventReward } = await this.inquirer.ask<RoomEventRewardParams>(ROOM_EVENT_REWARD_QS, {
      [ROOM_EVENT_REWARD]: undefined,
      value: AUTO_REWARD,
    });

    const game = this.context.get<Game>('game');
    const hero = game.getHero();
    hero.applyCharacteristic(roomEventReward, AUTO_REWARD);

    Logger.verbose(`Your characteristic '${roomEventReward}' were updated by value '+${AUTO_REWARD}'\n\n`, null, {
      timestamp: false,
    });

    await this.eventEmitter.emitAsync(RoomEventEvent.REWARDED, game);

    this.scenario.addScript(this.roomEventCompleteScript);
  }
}
