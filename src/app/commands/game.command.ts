import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { GameService } from '@game/services/game.service';
import { GAME } from '@app/constants/app.constants';

@Command({
  name: GAME,
  description: 'initiate new game',
  options: { isDefault: true },
})
export class GameCommand extends CommandRunner {
  constructor(private readonly gameService: GameService, private readonly inquirer: InquirerService) {
    super();
  }

  async run(): Promise<void> {
    try {
      Logger.verbose('Hello This is MyHero game');

      const { promptedStart } = await this.inquirer.ask<{ promptedStart: boolean }>(GAME, { promptedStart: undefined });
      if (!promptedStart) {
        Logger.verbose('GoodBy');
        return;
      }
      await this.gameService.restore('8a1388ad-d2a4-468f-bc95-91c7fae699d8');
    } catch (err) {
      Logger.error(err);
      // eslint-disable-next-line no-console
      console.trace(err);
      process.exit(1);
    }
  }
}
