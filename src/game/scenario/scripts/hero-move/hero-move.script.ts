import { Injectable, Logger } from '@nestjs/common';
import { IScript } from '@game/scenario/scenario.interfaces';
import { Context } from '@context/context';
import { Game } from '@game/game';
import { Utils } from '@common/utils';
import { HeroEvent, HeroMove, HeroRoomStatus } from '@game/hero/hero.enums';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InquirerService } from 'nest-commander';
import { HERO_MOVE, HERO_MOVE_QS, HeroMoveParams } from "@game/scenario/scripts/hero-move/hero-move.questions";
import { HeroLocation } from '@game/hero/hero.types';
import { Hero } from '@game/hero/hero';
import { Level } from '@game/level/level';
import { HERO_ENTER_QS, HeroEnterParams, PROMPTED_ENTER } from '@game/scenario/scripts/hero-move/hero-enter.questions';

@Injectable()
export class HeroMoveScript implements IScript {
  constructor(
    private readonly context: Context,
    private readonly eventEmitter: EventEmitter2,
    private readonly inquirer: InquirerService,
  ) {}

  async run(): Promise<void> {
    const game = this.context.get<Game>('game');
    const level = game.getLevel();
    const hero = game.getHero();
    const location = game.getHero().getLocation();

    if (!location) {
      await this.enter();
      return;
    }

    const { heroMove } = await this.inquirer.ask<HeroMoveParams>(HERO_MOVE_QS, {
      [HERO_MOVE]: undefined,
      walls: level.getRoom(location.x, location.y).walls,
    });

    this.move(location, heroMove);
    const room = hero.getRoomByLocation(location);

    if (room) {
      if (room.status === HeroRoomStatus.PASSED) {
        Logger.verbose(`You've been there before`);
        // Repeat move again
        await this.run();
      } else if (room.status === HeroRoomStatus.IN_PROGRESS) {
        // TODO Generate event and add to scenario
      }
      return;
    }

    // Enter the room
    this.enterRoom(hero, level, location);

    // TODO Generate event and add to scenario
  }

  private move(location: HeroLocation, where: HeroMove): void {
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
    Logger.verbose(`Your hero runs away ingloriously. History does not like cowards! GoodBy`, null, {
      timestamp: false,
    });
  }

  private async enter(): Promise<void> {
    const game = this.context.get<Game>('game');
    const level = game.getLevel();
    const hero = game.getHero();
    Logger.verbose(`You're standing in front of the entrance to the cave and examine it with powerful gaze`, null, {
      timestamp: false,
    });
    const { promptedEnter } = await this.inquirer.ask<HeroEnterParams>(HERO_ENTER_QS, {
      [PROMPTED_ENTER]: undefined,
    });
    if (!promptedEnter) {
      return this.exit();
    }
    const location: HeroLocation = { x: 0, y: 0 };

    this.enterRoom(hero, level, location);

    Logger.verbose(`You've entered to the cave and see the empty room [${location.x}, ${location.y}]`, null, {
      timestamp: false,
    });

    await this.eventEmitter.emitAsync(HeroEvent.UPDATED, game);

    // TODO: Add Event with empty strategy
  }

  private enterRoom(hero: Hero, level: Level, location: HeroLocation): void {
    hero
      .addRoom({
        uuid: Utils.generateUuid(),
        status: HeroRoomStatus.IN_PROGRESS,
        levelRoom: level.getRoom(location.x, location.y),
      })
      .setLocation(location);
  }
}
