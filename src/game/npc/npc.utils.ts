import { Utils } from '@common/utils';
import { Race } from '@game/npc/npc.enums';
import { RaceTemplateConfig } from '@game/common/race-templates/race-template.config';
import { ICharacteristicsManager } from '@game/npc/npc.interfaces';

export class NpcUtils {
  static getRandomRace(): Race {
    return Utils.getRandomFromArray(Object.values(Race));
  }

  static applyRace(chm: ICharacteristicsManager, race: Race): void {
    const state = chm.getCharacteristics();
    for (const [field, value] of Object.entries(RaceTemplateConfig[race])) {
      state[field] += value;
    }
    chm.updateCharacteristics(state);
  }
}
