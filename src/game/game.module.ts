import { Module } from '@nestjs/common';
import { StorageModule } from '@storage/storage.module';
import { DbStorageStrategy } from '@db-storage/db.storage.strategy';
import { GameService } from '@game/services/game.service';
import { GameCommand } from '@game/commands/game.command';
import { PlayerService } from '@game/player/services/player.service';
import { PlayerScript } from '@game/scenario/scripts/player/player.script';
import { PlayerQuestions } from '@game/scenario/scripts/player/player.questions';
import { GameInitScript } from '@game/scenario/scripts/game-init/game-init.script';
import { GameInitQuestions } from '@game/scenario/scripts/game-init/game-init.questions';
import { SCENARIO } from '@game/scenario/constants/scenario.constants';
import { ScriptCollection } from '@game/scenario/core/script.collection';
import { LevelService } from '@game/level/services/level.service';

@Module({
  imports: [StorageModule.register(DbStorageStrategy)],
  providers: [
    GameCommand,
    // Player
    PlayerService,
    PlayerScript,
    PlayerQuestions,
    // Game
    GameService,
    GameInitScript,
    GameInitQuestions,
    // Level
    LevelService,
    // Scenario
    {
      provide: SCENARIO,
      useFactory(playerScript: PlayerScript, gameInitScript: GameInitScript) {
        const scenario = new ScriptCollection();
        scenario.addScript(playerScript).addScript(gameInitScript);

        return scenario;
      },
      inject: [PlayerScript, GameInitScript],
    },
  ],
})
export class GameModule {}
