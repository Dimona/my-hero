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
}
