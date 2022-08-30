import { Inject } from '@nestjs/common';
import { SCENARIO } from '@game/scenario/scenario.constants';

export const InjectScenario = () => Inject(SCENARIO);
