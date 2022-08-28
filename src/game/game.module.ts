import { Module } from '@nestjs/common';
import { StorageModule } from '@storage/storage.module';
import { DbStorageStrategy } from '@db-storage/db.storage.strategy';
import { GameService } from '@game/services/game.service';
import { GameCommand } from '@game/commands/game.command';
import { GameQuestions } from '@game/interactive/game.question';

@Module({
  imports: [StorageModule.register(DbStorageStrategy)],
  providers: [GameService, GameCommand, GameQuestions],
  exports: [GameService],
})
export class GameModule {}
