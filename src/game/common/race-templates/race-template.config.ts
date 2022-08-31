import { Race } from '@game/hero/hero.enums';
import { Characteristics } from '@game/common/common.types';
import { HumanTemplate } from '@game/common/race-templates/human.template';
import { OrcTemplate } from '@game/common/race-templates/orc.template';
import { ElfTemplate } from '@game/common/race-templates/elf.template';
import { DarkElfTemplate } from '@game/common/race-templates/dark-elf.template';
import { GnomeTemplate } from '@game/common/race-templates/gnome.template';

export const RaceTemplateConfig: { [key in keyof typeof Race]: Characteristics } = {
  [Race.HUMAN]: HumanTemplate,
  [Race.ORС]: OrcTemplate,
  [Race.ELF]: ElfTemplate,
  [Race.DARK_ELF]: DarkElfTemplate,
  [Race.GNOME]: GnomeTemplate,
};
