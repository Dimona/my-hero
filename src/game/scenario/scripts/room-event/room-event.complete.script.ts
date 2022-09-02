import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IRoomEventScript } from '@game/scenario/scripts/room-event/room-event.interfaces';
import { Context } from '@context/context';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InquirerService } from 'nest-commander';
import { InjectScenario } from '@game/scenario/scenario.inject.decorator';
import { ScriptCollection } from '@game/scenario/script.collection';
import { HeroMoveScript } from '@game/scenario/scripts/hero-move/hero-move.script';
import { Game } from '@game/game';
import { RoomEventEvent } from '@game/scenario/scripts/room-event/room-event.enums';
import { HeroRoomStatus } from '@game/hero/hero.enums';

@Injectable()
export class RoomEventCompleteScript implements IRoomEventScript {
  constructor(
    private readonly context: Context,
    private readonly eventEmitter: EventEmitter2,
    private readonly inquirer: InquirerService,
    @InjectScenario() private readonly scenario: ScriptCollection,
    @Inject(forwardRef(() => HeroMoveScript))
    private readonly heroMoveScript: HeroMoveScript,
  ) {}

  async run(): Promise<void> {
    const game = this.context.get<Game>('game');
    const hero = game.getHero();
    const heroRoom = hero.getRoomByLocation(hero.getLocation());
    heroRoom.status = HeroRoomStatus.PASSED;

    await this.eventEmitter.emitAsync(RoomEventEvent.PASSED, game);

    this.scenario.addScript(this.heroMoveScript);
  }
}
