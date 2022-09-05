import { RewardsConfig } from '@game/scenario/scripts/room-event/reward/reward.config';
import { CharacteristicLabel } from '@game/hero/hero.enums';

export const AUTO_REWARD = 5;
export const AUTO_TRAP_REWARD = -5;
export const BATTLE_REWARD = 10;

export const REWARDS: RewardsConfig[] = [
  {
    characteristic: 'maxHealth',
    label: CharacteristicLabel.health,
  },
  {
    characteristic: 'maxManna',
    label: CharacteristicLabel.manna,
  },
  {
    characteristic: 'physicalAttack',
    label: CharacteristicLabel.physicalAttack,
  },
  {
    characteristic: 'physicalDefense',
    label: CharacteristicLabel.physicalDefense,
  },
  {
    characteristic: 'magicalAttack',
    label: CharacteristicLabel.magicalAttack,
  },
  {
    characteristic: 'magicalDefense',
    label: CharacteristicLabel.magicalDefense,
  },
];
