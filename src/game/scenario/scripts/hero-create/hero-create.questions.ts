import { Question, QuestionSet } from 'nest-commander';
import { Names } from 'fantasy-content-generator';
import { Race, RaceLabel } from '@game/npc/npc.enums';

export const HERO_CREATE_QS = 'hero-create.qs';

export const HERO_RACE = 'race';
export const HERO_NAME = 'name';

export type HeroCreateParams = {
  [HERO_RACE]: Race;
  [HERO_NAME]: string;
};

@QuestionSet({ name: HERO_CREATE_QS })
export class HeroCreateQuestions {
  @Question({
    type: 'input',
    message: `What will be you hero's name?`,
    name: HERO_NAME,
    default: () => Names.generate().name,
  })
  parseName(value: string): string {
    return value;
  }

  @Question({
    type: 'list',
    message: 'What race do you prefer?',
    name: HERO_RACE,
    choices: [
      { name: RaceLabel.HUMAN, value: Race.HUMAN },
      { name: RaceLabel.ORC, value: Race.ORC },
      { name: RaceLabel.GNOME, value: Race.GNOME },
      { name: RaceLabel.ELF, value: Race.ELF },
      { name: RaceLabel.DARK_ELF, value: Race.DARK_ELF },
    ],
  })
  parseInit(value: string): string {
    return value;
  }
}
