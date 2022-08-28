import { CommandFactory } from 'nest-commander';
import { AppModule } from '@app/app.module';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from '@loggers/winston/winston.logger.config';

const bootstrap = async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,no-underscore-dangle
  // require('events').EventEmitter.prototype._maxListeners = 100;

  await CommandFactory.run(AppModule, {
    // logger: WinstonModule.createLogger(winstonLoggerConfig),
  });
};
bootstrap();
