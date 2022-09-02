import { ChoicesFor, Question, QuestionSet } from 'nest-commander';
import { QuestionList } from '@common/types';
import { Characteristics } from '@game/common/common.types';
import { REWARDS } from '@game/scenario/scripts/room-event/reward/reward.constants';

export const ROOM_EVENT_REWARD_QS = 'room-event.reward.qs';

export const ROOM_EVENT_REWARD = 'roomEventReward';

export type RoomEventRewardParams = {
  predicate?: { action: 'only' | 'without'; list: Set<keyof Characteristics> };
  value: number;
  [ROOM_EVENT_REWARD]: keyof Characteristics;
};

@QuestionSet({ name: ROOM_EVENT_REWARD_QS })
export class RewardQuestions {
  @Question({
    type: 'list',
    message: 'Please select a reward?',
    name: ROOM_EVENT_REWARD,
  })
  parseReward(value: keyof Characteristics): keyof Characteristics {
    return value;
  }

  @ChoicesFor({
    name: ROOM_EVENT_REWARD,
  })
  parseChoicesForGameEventReward({ value, predicate }: RoomEventRewardParams): QuestionList<keyof Characteristics> {
    return REWARDS.reduce<QuestionList<keyof Characteristics>>((ql, reward) => {
      if (
        (predicate?.action === 'only' && !predicate?.list.has(reward.characteristic)) ||
        (predicate?.action === 'without' && predicate?.list.has(reward.characteristic))
      ) {
        return;
      }
      ql.push({
        name: `${reward.label} ${value < 0 ? value : `+${value}`}`,
        value: reward.characteristic,
      });

      return ql;
    }, []);
  }
}
