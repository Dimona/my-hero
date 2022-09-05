import { v4 as uuidv4 } from 'uuid';
import { ProbabilityConfig } from '@common/types';

export class Utils {
  static getCurrentTimestamp(): number {
    return new Date().valueOf();
  }

  static generateUuid(): string {
    return uuidv4();
  }

  static randomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  static toStaticString(str: string, length: number, fillChar: string = ' '): string {
    if (str.length > length) {
      return str;
    }
    return `${str}${Array.from({ length: length - str.length }, () => fillChar).join('')}`;
  }

  static getRandomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  static getRandomFromArrayByProbability<V = any>(config: ProbabilityConfig<V>): V {
    const input = Math.random();
    let threshold = 0;
    for (let i = 0; i < config.length; i++) {
      threshold += config[i].prob;
      if (threshold > input) {
        return config[i].value;
      }
    }
  }

  static randomIntFromRange(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static async waitForKey(keyCode): Promise<void> {
    return new Promise(resolve => {
      process.stdin.on('data', function (chunk) {
        if (chunk[0] === keyCode) {
          resolve();
          process.stdin.pause();
        }
      });
    });
  }
}
