import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { GameService } from '@game/services/game.service';
import { GAME } from '@game/constants/game.constants';
import { InjectScenario } from '@game/scenario/decorators/scenario.inject.decorator';
import { ScriptCollection } from '@game/scenario/core/script.collection';

@Command({
  name: GAME,
  description: 'launch MyHero game',
  options: { isDefault: true },
})
export class GameCommand extends CommandRunner {
  constructor(@InjectScenario() private readonly scenario: ScriptCollection) {
    super();
  }

  async run(): Promise<void> {
    try {
      Logger.verbose('****************************** MY HERO ******************************');

      const iterator = this.scenario.getIterator();
      while (iterator.valid()) {
        const script = iterator.current();

        await script.run();
        iterator.next();
      }

      Logger.verbose('****************************** THE END ******************************');
    } catch (err) {
      Logger.error(err);
      // eslint-disable-next-line no-console
      console.trace(err);
      process.exit(1);
    }
  }
}
