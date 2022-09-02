import { Characteristics } from '@game/common/common.types';

export type RewardsConfig = {
  characteristic: keyof Characteristics;
  label: string;
};
