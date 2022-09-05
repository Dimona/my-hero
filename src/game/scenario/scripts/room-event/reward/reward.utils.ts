import { RewardsConfig } from '@game/scenario/scripts/room-event/reward/reward.config';
import { REWARDS } from '@game/scenario/scripts/room-event/reward/reward.constants';
import { Utils } from '@common/utils';

export class RewardUtils {
  static getRandomReward(): RewardsConfig {
    return Utils.getRandomFromArray(REWARDS);
  }
}
