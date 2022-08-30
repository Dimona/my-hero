import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { GAME_STORAGE } from '@storage/storage.constants';
import { Storage } from '@storage/storage';
import { GameEntity } from '@db-storage/entities/game.entity';
import { DbStorageStrategy } from '@db-storage/db.storage.strategy';
import { DbModule } from '@db-storage/db.module';
import { LevelEntity } from '@db-storage/entities/level.entity';
import { PlayerEntity } from '@db-storage/entities/player.entity';
import { LevelRoomEntity } from '@db-storage/entities/level-room.entity';

export class DbStorageDynamicModuleFactory {
  static create(): DynamicModule {
    const imports = [];
    const providers: Provider[] = [];
    imports.push(DbModule, TypeOrmModule.forFeature([GameEntity, LevelEntity, PlayerEntity, LevelRoomEntity]));
    providers.push(DbStorageStrategy);
    providers.push({
      provide: GAME_STORAGE,
      useFactory: (dbStorageStrategy: DbStorageStrategy) => new Storage(dbStorageStrategy),
      inject: [DbStorageStrategy],
    });

    return <DynamicModule>{
      imports,
      providers,
      exports: [GAME_STORAGE],
    };
  }
}
