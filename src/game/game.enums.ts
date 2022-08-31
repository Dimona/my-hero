export enum GameStatus {
  PENDING_START = 'PENDING_START',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export enum GameEvent {
  STARTED = 'game.started',
  UPDATED = 'game.updated',
  RESTORED = 'game.restored',
}
