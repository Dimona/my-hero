import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { Context } from '@context/context';
import { Game } from '@game/game';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InquirerService } from 'nest-commander';
import { IRoomEventScript } from '@game/scenario/scripts/room-event/room-event.interfaces';
import { InjectScenario } from '@game/scenario/scenario.inject.decorator';
import { ScriptCollection } from '@game/scenario/script.collection';
import { AUTO_REWARD } from '@game/scenario/scripts/room-event/reward/reward.constants';
import { RewardUtils } from '@game/scenario/scripts/room-event/reward/reward.utils';
import { RoomEventEvent } from '@game/scenario/scripts/room-event/room-event.enums';
import { RoomEventCompleteScript } from '@game/scenario/scripts/room-event/room-event.complete.script';

@Injectable()
export class AutoRewardRoomEventScript implements IRoomEventScript {
  constructor(
    private readonly context: Context,
    private readonly eventEmitter: EventEmitter2,
    private readonly inquirer: InquirerService,
    @InjectScenario() private readonly scenario: ScriptCollection,
    @Inject(forwardRef(() => RoomEventCompleteScript))
    private readonly roomEventCompleteScript: RoomEventCompleteScript,
  ) {}

  async run(): Promise<void> {
    Logger.warn(`You are entering the room and it's empty.`, null, { timestamp: false });
    Logger.verbose(`But you are a hero and will be rewarded for your courage.\n\n`, null, { timestamp: false });

    const { characteristic } = RewardUtils.getRandom();

    const game = this.context.get<Game>('game');
    const hero = game.getHero();
    hero.applyCharacteristic(characteristic, AUTO_REWARD);

    Logger.verbose(`Your characteristic '${characteristic}' were updated by value '+${AUTO_REWARD}'\n\n`, null, {
      timestamp: false,
    });

    await this.eventEmitter.emitAsync(RoomEventEvent.REWARDED, game);

    this.scenario.addScript(this.roomEventCompleteScript);
  }
}
