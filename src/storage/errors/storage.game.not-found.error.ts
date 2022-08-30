import { StorageError, StorageErrorCode } from '@storage/errors/storage.error';
import { Uuid } from '@game/game.types';

export class StorageGameNotFoundError extends StorageError {
  constructor({ uuid }: { uuid?: Uuid } = {}) {
    super(StorageErrorCode.GAME_NOT_FOUND, `Game${uuid ? ` with uuid '${uuid}'` : ''} was not found`);
  }
}
