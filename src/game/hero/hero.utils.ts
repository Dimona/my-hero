import { Hero } from '@game/hero/hero';
import { Race } from '@game/hero/hero.enums';
import { RaceTemplateConfig } from '@game/common/race-templates/race-template.config';

export class HeroUtils {
  static applyRace(hero: Hero, race: Race): void {
    const state = hero.geCharacteristics();
    for (const [field, value] of Object.entries(RaceTemplateConfig[race])) {
      state[field] += value;
    }
    hero.updateCharacteristics(state);
  }
}
