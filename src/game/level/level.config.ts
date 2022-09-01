import { registerAs } from '@nestjs/config';
import { LevelConfig } from '@game/level/level.types';
import { DEFAULT_LEVEL_HEIGHT, DEFAULT_LEVEL_WIDTH } from '@game/level/level.constants';

export const LEVEL_CONFIG = 'level';

export const levelConfig = registerAs(
  LEVEL_CONFIG,
  () =>
    <LevelConfig>{
      width: Number(process.env.LEVEL_WIDTH || DEFAULT_LEVEL_WIDTH),
      height: Number(process.env.LEVEL_HEIGHT || DEFAULT_LEVEL_HEIGHT),
    },
);
