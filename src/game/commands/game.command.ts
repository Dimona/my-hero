import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { GAME } from '@game/game.constants';
import { InjectScenario } from '@game/scenario/scenario.inject.decorator';
import { ScriptCollection } from '@game/scenario/script.collection';
import { Graphic } from '@graphics/renderers';
import { PlayerScript } from '@game/scenario/scripts/player/player.script';
import { GameInitScript } from '@game/scenario/scripts/game-init/game-init.script';

@Command({
  name: GAME,
  description: 'launch MyHero game',
  options: { isDefault: true },
})
export class GameCommand extends CommandRunner {
  constructor(
    @InjectScenario() private readonly scenario: ScriptCollection,
    private readonly playerScript: PlayerScript,
    private readonly gameInitScript: GameInitScript,
  ) {
    super();
  }

  async run(): Promise<void> {
    Logger.log('*********************************************************************************');
    Graphic.logo();

    this.scenario.addScript(this.playerScript).addScript(this.gameInitScript);

    const iterator = this.scenario.getIterator();
    while (iterator.valid()) {
      const script = iterator.current();

      await script.run();
      iterator.next();
    }

    Logger.log('************************************ THE END ************************************');
  }
}
