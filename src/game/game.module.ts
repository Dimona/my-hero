import { Module } from '@nestjs/common';
import { levelConfig } from '@game/level/level.config';
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
import { ConfigModule } from '@nestjs/config';
import { HeroMoveScript } from '@game/scenario/scripts/hero-move/hero-move.script';
import { GameStartQuestions } from '@game/scenario/scripts/game-init/game-start.questions';
import { HeroEnterQuestions } from '@game/scenario/scripts/hero-move/hero-enter.questions';
import { HeroMoveQuestions } from '@game/scenario/scripts/hero-move/hero-move.questions';

@Module({
  imports: [StorageModule.register(DbStorageStrategy), ConfigModule.forFeature(levelConfig)],
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
    GameStartQuestions,
    // Level
    LevelService,
    // Hero
    HeroService,
    HeroCreateScript,
    HeroCreateQuestions,
    // Move
    HeroMoveScript,
    HeroMoveQuestions,
    HeroEnterQuestions,
    // Scenario
    {
      provide: SCENARIO,
      useValue: new ScriptCollection(),
    },
  ],
})
export class GameModule {}
