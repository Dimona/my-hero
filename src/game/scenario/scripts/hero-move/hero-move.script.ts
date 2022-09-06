import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { IScript } from '@game/scenario/scenario.interfaces';
import { Context } from '@context/context';
import { Game } from '@game/game';
import { Utils } from '@common/utils';
import { HeroEvent, HeroMove, HeroRoomStatus } from '@game/hero/hero.enums';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InquirerService } from 'nest-commander';
import { HERO_MOVE, HERO_MOVE_QS, HeroMoveParams } from '@game/scenario/scripts/hero-move/hero-move.questions';
import { HERO_ENTER_QS, HeroEnterParams, PROMPTED_ENTER } from '@game/scenario/scripts/hero-move/hero-enter.questions';
import { InjectScenario } from '@game/scenario/scenario.inject.decorator';
import { ScriptCollection } from '@game/scenario/script.collection';
import { AutoRewardRoomEventScript } from '@game/scenario/scripts/room-event/auto-reward/auto-reward.room-event.script';
import { RoomEventGenerator } from '@game/scenario/scripts/room-event/room-event.generator';
import { Graphic } from '@graphics/renderers';
import { TLocation } from '@game/common/common.types';
import { EXIT_FROM_CAVE } from '@game/scenario/scripts/hero-move/hero-move.constants';
import { GameEvent } from '@game/game.enums';

@Injectable()
export class HeroMoveScript implements IScript {
  constructor(
    private readonly context: Context,
    private readonly eventEmitter: EventEmitter2,
    private readonly inquirer: InquirerService,
    private readonly roomEventGenerator: RoomEventGenerator,
    @InjectScenario() private readonly scenario: ScriptCollection,
    @Inject(forwardRef(() => AutoRewardRoomEventScript))
    private readonly autoRewardRoomEventScript: AutoRewardRoomEventScript,
  ) {}

  async run(): Promise<void> {
    const game = this.context.get<Game>('game');
    const location = game.getHero().getLocation();

    if (!location) {
      await this.enterCave();
      return;
    }

    await this.processLocation(location);
  }

  private async processLocation(location: TLocation): Promise<void> {
    const game = this.context.get<Game>('game');
    const hero = game.getHero();
    const level = game.getLevel();

    const heroRoom = hero.getRoomByLocation(location);

    if (!heroRoom) {
      await this.enterRoom(location);
      return;
    }

    await this.eventEmitter.emitAsync(HeroEvent.UPDATED, game);

    switch (heroRoom.status) {
      case HeroRoomStatus.IN_PROGRESS:
        this.scenario.addScript(this.roomEventGenerator.generateEvent());
        return;
      case HeroRoomStatus.PASSED:
        const { heroMove } = await this.inquirer.ask<HeroMoveParams>(HERO_MOVE_QS, {
          [HERO_MOVE]: undefined,
          location: hero.getLocation(),
          walls: level.getRoom(location.x, location.y).walls,
        });
        if (heroMove === EXIT_FROM_CAVE) {
          await this.eventEmitter.emitAsync(GameEvent.FINISHED, game);
          return;
        }
        this.move(location, heroMove as HeroMove);
        Graphic.showHeroLevel(level, hero);

        // Check if already been there
        if (hero.getRoomByLocation(location)) {
          Logger.warn(`You've been there before\n`);
        } else {
          await this.enterRoom(location);
        }

        await this.processLocation(location);
        break;
    }
  }

  private move(location: TLocation, where: HeroMove): void {
    switch (where) {
      case HeroMove.LEFT:
        location.y--;
        break;
      case HeroMove.TOP:
        location.x--;
        break;
      case HeroMove.RIGHT:
        location.y++;
        break;
      case HeroMove.BOTTOM:
        location.x++;
        break;
    }
  }

  private exit(): void {
    Logger.warn(`Your hero runs away ingloriously. History does not like cowards! Goodbye`);
  }

  private async enterCave(): Promise<void> {
    const game = this.context.get<Game>('game');

    Logger.warn(`You're standing in front of the entrance to the cave and examine it with powerful gaze\n`);
    const { promptedEnter } = await this.inquirer.ask<HeroEnterParams>(HERO_ENTER_QS, {
      [PROMPTED_ENTER]: undefined,
    });
    if (!promptedEnter) {
      return this.exit();
    }
    const location: TLocation = { x: 0, y: 0 };

    await this.enterRoom(location);

    Logger.verbose(`You've entered to the cave and see the empty room [${location.x}, ${location.y}]\n`);

    await this.eventEmitter.emitAsync(HeroEvent.UPDATED, game);

    this.scenario.addScript(this.autoRewardRoomEventScript);
  }

  private async enterRoom(location: TLocation): Promise<void> {
    const game = this.context.get<Game>('game');
    const level = game.getLevel();
    const hero = game.getHero();
    hero
      .addRoom({
        uuid: Utils.generateUuid(),
        status: HeroRoomStatus.IN_PROGRESS,
        levelRoom: level.getRoom(location.x, location.y),
      })
      .setLocation(location);
  }
}
