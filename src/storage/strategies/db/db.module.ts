import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from '@db-storage/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from '@db-storage/db.constants';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(DATABASE_CONFIG),
    }),
  ],
})
export class DbModule {}
