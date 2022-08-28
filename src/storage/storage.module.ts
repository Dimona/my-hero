import { DynamicModule, Module } from '@nestjs/common';
import { StorageStrategyType } from '@storage/enums/storage.enums';
import { DbStorageDynamicModuleFactory } from '@db-storage/factories/db.storage.module.factory';
import { StorageService } from '@storage/services/storage.service';
import { StorageStrategyTyped } from './types/storage.types';
import { DefaultStorageDynamicModuleFactory } from '@storage/strategies/default/factories/default.storage.module.factory';

@Module({})
export class StorageModule {
  static register(strategyClass: StorageStrategyTyped): DynamicModule {
    let module: DynamicModule;
    switch (strategyClass.type) {
      case StorageStrategyType.DB:
        module = DbStorageDynamicModuleFactory.create();
        break;

      default:
        module = DefaultStorageDynamicModuleFactory.create();
    }
    return <DynamicModule>{
      module: StorageModule,
      ...module,
      providers: [...module.providers, StorageService],
      exports: [...module.exports, StorageService],
    };
  }
}
