import { IScript } from '@game/scenario/scenario.interfaces';
import { InquirerService } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { Context } from '@context/context';
import { Game } from '@game/game';
import {
  HERO_CREATE_QS,
  HERO_NAME,
  HERO_RACE,
  HeroCreateParams,
} from '@game/scenario/scripts/hero-create/hero-create.questions';
import { HeroService } from '@game/hero/hero.service';
import colors from 'colors';
import { RaceLabel } from '@game/hero/hero.enums';

@Injectable()
export class HeroCreateScript implements IScript {
  constructor(
    private readonly inquirer: InquirerService,
    private readonly heroService: HeroService,
    private readonly context: Context,
  ) {}

  async run(): Promise<void> {
    const game = this.context.get<Game>('game');
    if (!game) {
      throw new Error('Game should be initiated');
      // TODO: change to internal errors
    }

    Logger.verbose(`Let's create your HERO`);

    const { name, race } = await this.inquirer.ask<HeroCreateParams>(HERO_CREATE_QS, {
      [HERO_NAME]: undefined,
      [HERO_RACE]: undefined,
    });

    const hero = await this.heroService.create(game, name, race);

    Logger.verbose(
      `Your hero is ${colors.bold(colors.blue(RaceLabel[hero.getRace()]))} with name ${colors.bold(
        colors.green(hero.getName()),
      )}`,
      { timestamp: false },
    );

    // TODO: Add Next script into scenario
  }
}
