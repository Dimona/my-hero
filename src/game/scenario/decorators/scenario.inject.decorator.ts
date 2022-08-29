import { Inject } from '@nestjs/common';
import { SCENARIO } from '@game/scenario/constants/scenario.constants';

export const InjectScenario = () => Inject(SCENARIO);
