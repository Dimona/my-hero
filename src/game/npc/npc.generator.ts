import { Names } from 'fantasy-content-generator';
import { NpcUtils } from '@game/npc/npc.utils';
import { Npc } from '@game/npc/npc';

export class NpcGenerator {
  static generate(): Npc {
    return Npc.create({ name: Names.generate().name, race: NpcUtils.getRandomRace() });
  }
}
