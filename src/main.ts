import { CommandFactory } from 'nest-commander';
import { AppModule } from '@app/app.module';
// import { WinstonModule } from 'nest-winston';
// import { winstonLoggerConfig } from './logger/winston/winston.logger.config';
import { CustomLogger } from './logger/custom/custom.logger';

const bootstrap = async () => {
  await CommandFactory.run(AppModule, {
    errorHandler: err => {
      console.trace(err);
      process.exit(1);
    },
    logger: new CustomLogger('MyHero'),
    // logger: WinstonModule.createLogger(winstonLoggerConfig),
  });
};
bootstrap();
