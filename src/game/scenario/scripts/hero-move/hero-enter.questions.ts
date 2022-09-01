import { Question, QuestionSet } from 'nest-commander';

export const HERO_ENTER_QS = 'hero-enter.qs';

export const PROMPTED_ENTER = 'promptedEnter';

export type HeroEnterParams = {
  [PROMPTED_ENTER]: boolean;
};

@QuestionSet({ name: HERO_ENTER_QS })
export class HeroEnterQuestions {
  @Question({
    type: 'confirm',
    message: `Let's enter?`,
    default: true,
    name: PROMPTED_ENTER,
  })
  parseEnter(value: boolean): boolean {
    return value;
  }
}
