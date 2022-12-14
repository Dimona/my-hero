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
import { Graphic } from '@graphics/renderers';

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
    Logger.warn(`You are entering the room and it's empty.`);
    Logger.verbose(`But you are a hero and will be rewarded for your courage.\n`);

    const { characteristic } = RewardUtils.getRandomReward();

    const game = this.context.get<Game>('game');
    const hero = game.getHero();
    hero.applyCharacteristic(characteristic, AUTO_REWARD);
    if (characteristic === 'maxManna') {
      hero.applyCharacteristic('manna', AUTO_REWARD);
    }
    if (characteristic === 'maxHealth') {
      hero.applyCharacteristic('health', AUTO_REWARD);
    }

    Logger.verbose(`Your characteristic '${characteristic}' were updated by value '+${AUTO_REWARD}'\n`);

    Graphic.hero(hero);

    await this.eventEmitter.emitAsync(RoomEventEvent.REWARDED, game);

    this.scenario.addScript(this.roomEventCompleteScript);
  }
}
