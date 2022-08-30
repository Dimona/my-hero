import { DynamicModule, Module } from '@nestjs/common';
import { StorageStrategyType } from '@storage/storage.enums';
import { DbStorageDynamicModuleFactory } from '@db-storage/db.storage.module.factory';
import { StorageService } from '@storage/storage.service';
import { StorageStrategyTyped } from './storage.types';
import { DefaultStorageDynamicModuleFactory } from '@storage/strategies/default/default.storage.module.factory';

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
