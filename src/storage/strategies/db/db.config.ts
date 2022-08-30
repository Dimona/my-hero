import { DATABASE_CONFIG } from '@db-storage/db.constants';
import { registerAs } from '@nestjs/config';
import { GLOBAL_PREFIX } from '@app/app.constants';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';

export const databaseConfig = registerAs(
  DATABASE_CONFIG,
  () =>
    <TypeOrmModuleOptions>{
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_DB,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: true,
      retryDelay: 1000,
      installExtensions: false,
      logging: process.env.DATABASE_LOGGING === 'true',
      synchronize: false,
      applicationName: GLOBAL_PREFIX,
      migrationsRun: true,
      migrations: [path.resolve(__dirname, './migrations/*.{ts,js}')],
      migrationsTableName: 'migrations',
      migrationsTransactionMode: 'each',
    },
);
