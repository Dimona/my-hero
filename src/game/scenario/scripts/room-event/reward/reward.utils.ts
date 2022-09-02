import { RewardsConfig } from '@game/scenario/scripts/room-event/reward/reward.config';
import { REWARDS } from '@game/scenario/scripts/room-event/reward/reward.constants';

export class RewardUtils {
  static getRandom(): RewardsConfig {
    return REWARDS[Math.floor(Math.random() * REWARDS.length)];
  }
}
