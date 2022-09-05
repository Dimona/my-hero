export enum HeroEvent {
  CREATED = 'hero.created',
  RESTORED = 'hero.restored',
  UPDATED = 'hero.updated',
  DEAD = 'hero.dead',
}

export enum HeroMove {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum HeroRoomStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  PASSED = 'PASSED',
}

export enum CharacteristicLabel {
  health = 'health',
  manna = 'manna',
  physicalAttack = 'physical attack',
  physicalDefense = 'physical defense',
  magicalAttack = 'magical attack',
  magicalDefense = 'magical defense',
}
