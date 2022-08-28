export enum StorageErrorCode {
  GAME_NOT_FOUND = 'GAME_NOT_FOUND',
}

export abstract class StorageError extends Error {
  protected constructor(code: StorageErrorCode, message?: string) {
    super(message);
  }
}
