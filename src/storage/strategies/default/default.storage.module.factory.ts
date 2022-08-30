import { DynamicModule } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { GAME_STORAGE } from '@storage/storage.constants';
import { Storage } from '@storage/storage';
import { DefaultStorageStrategy } from '@storage/strategies/default/default.storage.strategy';

export class DefaultStorageDynamicModuleFactory {
  static create(): DynamicModule {
    const imports = [];
    const providers: Provider[] = [];
    providers.push(DefaultStorageStrategy);
    providers.push({
      provide: GAME_STORAGE,
      useFactory: (defaultStorageStrategy: DefaultStorageStrategy) => new Storage(defaultStorageStrategy),
      inject: [DefaultStorageStrategy],
    });

    return <DynamicModule>{
      imports,
      providers,
      exports: [GAME_STORAGE],
    };
  }
}
