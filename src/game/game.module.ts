import { Module } from '@nestjs/common';
import { StorageModule } from '@storage/storage.module';
import { DbStorageStrategy } from '@db-storage/db.storage.strategy';
import { GameService } from '@game/services/game.service';

@Module({
  imports: [StorageModule.register(DbStorageStrategy)],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
