import { default as winston } from 'winston';

export const winstonLoggerConfig = {
  level: 'verbose',
  format: winston.format.colorize({ all: true }),
  transports: [new winston.transports.Console({ format: winston.format.simple() })],
};
