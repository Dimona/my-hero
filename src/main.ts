import { CommandFactory } from 'nest-commander';
import { AppModule } from '@app/app.module';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from '@loggers/winston/winston.logger.config';
import { CustomLogger } from '@loggers/custom/custom.logger';

const bootstrap = async () => {
  await CommandFactory.run(AppModule, {
    logger: new CustomLogger('MyHero'),
    // logger: WinstonModule.createLogger(winstonLoggerConfig),
  });
};
bootstrap();
