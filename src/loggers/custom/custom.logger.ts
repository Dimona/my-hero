import { ConsoleLogger } from '@nestjs/common';
import colors from 'colors';

export type LoggerOptions = {
  timestamp?: boolean;
  separator?: string;
};

export class CustomLogger extends ConsoleLogger {
  buildMessage(message: any, ...optionalParams: [...any, string?]): string {
    const [context, options] = optionalParams;
    const { separator = ' - ', timestamp = true } = options || <LoggerOptions>{};

    return `${timestamp ? `${this.getTimestamp()}${separator}` : ''}${message}`;
  }

  log(message: any, ...optionalParams: [...any, string?]): void {
    console.info(colors.dim(colors.blue(this.buildMessage(message, ...optionalParams))));
  }

  verbose(message: any, ...optionalParams: [...any, string?]): void {
    console.info(colors.cyan(this.buildMessage(message, ...optionalParams)));
  }

  error(message: any, ...optionalParams: [...any, string?]): void {
    console.error(colors.red(this.buildMessage(message, ...optionalParams)));
  }
}
