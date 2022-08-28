import { Inject } from '@nestjs/common';
import { GAME_STORAGE } from '@storage/constants/storage.constants';

export const InjectStorage = () => Inject(GAME_STORAGE);
