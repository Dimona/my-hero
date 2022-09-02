import { RewardsConfig } from '@game/scenario/scripts/room-event/reward/reward.config';

export const AUTO_REWARD = 5;
export const AUTO_TRAP_REWARD = -5;

export const REWARDS: RewardsConfig[] = [
  {
    characteristic: 'maxHealth',
    label: 'health',
  },
  {
    characteristic: 'maxManna',
    label: 'manna',
  },
  {
    characteristic: 'physicalAttack',
    label: 'physical attack',
  },
  {
    characteristic: 'physicalDefense',
    label: 'physical defense',
  },
  {
    characteristic: 'magicalAttack',
    label: 'magical attack',
  },
  {
    characteristic: 'magicalDefense',
    label: 'magical defense',
  },
];
