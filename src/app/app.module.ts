import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GameCommand } from '@app/../game/commands/game.command';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from '@loggers/winston/winston.logger.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GameModule } from '@game/game.module';
import { OutputModule } from '@output/output.module';
import { ContextModule } from '@context/context.module';
import { GameQuestions } from '@app/../game/interactive/game.question';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({
      maxListeners: 100,
      removeListener: false,
      delimiter: '.',
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    WinstonModule.forRootAsync({
      useFactory: () => winstonLoggerConfig,
    }),
    GameModule,
    OutputModule,
    ContextModule,
  ],
})
export class AppModule {}
