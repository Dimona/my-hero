import { v4 as uuidv4 } from 'uuid';

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
}
