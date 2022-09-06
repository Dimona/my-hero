import { ConsoleLogger } from '@nestjs/common';
import colors from 'colors';

export type LoggerOptions = {
  timestamp?: boolean;
  separator?: string;
};

export class CustomLogger extends ConsoleLogger {
  buildMessage(message: any, ...optionalParams: [...any, string?]): string {
    const [, options] = optionalParams;
    const { separator = ' - ', timestamp = false } = options || <LoggerOptions>{};

    return `${timestamp ? `${this.getTimestamp()}${separator}` : ''}${message}`;
  }

  log(message: any, ...optionalParams: [...any, string?]): void {
    const [, options = <LoggerOptions>{}] = optionalParams;
    if (options.timestamp === undefined) {
      options.timestamp = true;
    }

    console.info(colors.dim(colors.blue(this.buildMessage(message, ...optionalParams))));
  }

  verbose(message: any, ...optionalParams: [...any, string?]): void {
    console.info(colors.cyan(this.buildMessage(message, ...optionalParams)));
  }

  warn(message: any, ...optionalParams: [...any, string?]): void {
    console.warn(colors.yellow(this.buildMessage(message, ...optionalParams)));
  }

  error(message: any, ...optionalParams: [...any, string?]): void {
    console.error(colors.red(this.buildMessage(message, ...optionalParams)));
  }
}
