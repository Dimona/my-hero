import { Module } from '@nestjs/common';
import { StorageModule } from '@storage/storage.module';
import { DbStorageStrategy } from '@db-storage/db.storage.strategy';
import { GameService } from '@game/game.service';
import { GameCommand } from '@game/game.command';
import { PlayerService } from '@game/player/player.service';
import { PlayerScript } from '@game/scenario/scripts/player/player.script';
import { PlayerQuestions } from '@game/scenario/scripts/player/player.questions';
import { GameInitScript } from '@game/scenario/scripts/game-init/game-init.script';
import { GameInitQuestions } from '@game/scenario/scripts/game-init/game-init.questions';
import { SCENARIO } from '@game/scenario/scenario.constants';
import { ScriptCollection } from '@game/scenario/script.collection';
import { LevelService } from '@game/level/level.service';
import { HeroCreateScript } from '@game/scenario/scripts/hero-create/hero-create.script';
import { HeroCreateQuestions } from '@game/scenario/scripts/hero-create/hero-create.questions';
import { HeroService } from '@game/hero/hero.service';

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
    // Hero
    HeroService,
    HeroCreateScript,
    HeroCreateQuestions,
    // Scenario
    {
      provide: SCENARIO,
      useValue: new ScriptCollection(),
    },
  ],
})
export class GameModule {}
