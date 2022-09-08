import { Injectable, Logger } from '@nestjs/common';
import { Context } from '@context/context';
import { Game } from '@game/game';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InquirerService } from 'nest-commander';
import { IRoomEventScript } from '@game/scenario/scripts/room-event/room-event.interfaces';
import { InjectScenario } from '@game/scenario/scenario.inject.decorator';
import { ScriptCollection } from '@game/scenario/script.collection';
import { RoomEventEvent } from '@game/scenario/scripts/room-event/room-event.enums';
import { Graphic } from '@graphics/renderers';
import { NpcGenerator } from '@game/npc/npc.generator';
import { Hero } from '@game/hero/hero';
import { Npc } from '@game/npc/npc';
import {
  BATTLE_ATTACK,
  BATTLE_ATTACK_QS,
  BattleAttackParams,
} from '@game/scenario/scripts/room-event/battle/battle-attack.questions';
import { BattleAttack } from '@game/scenario/scripts/room-event/battle/battle.enums';
import { ICharacteristicsManager } from '@game/npc/npc.interfaces';
import { BattleAttackFactory } from '@game/scenario/scripts/room-event/battle/attack/battle.attack.factory';
import { BattleUtils } from '@game/scenario/scripts/room-event/battle/battle.utils';
import { BattleRewardRoomEventScript } from '@game/scenario/scripts/room-event/battle/battle-reward.room-event.script';
import colors from 'colors';
import {
  BATTLE_TURN_INIT,
  BATTLE_TURN_INIT_QS,
  BattleTurnInitParams,
} from '@game/scenario/scripts/room-event/battle/turn-init.questions';
import { HeroEvent } from '@game/hero/hero.enums';

@Injectable()
export class BattleScript implements IRoomEventScript {
  constructor(
    private readonly context: Context,
    private readonly inquirer: InquirerService,
    private readonly eventEmitter: EventEmitter2,
    @InjectScenario() private readonly scenario: ScriptCollection,
    private readonly battleRewardRoomEventScript: BattleRewardRoomEventScript,
  ) {}

  async run(): Promise<void> {
    const game = this.context.get<Game>('game');
    const hero = game.getHero();
    Logger.warn(`You are entering the room and see the enemy.`);
    const npc = NpcGenerator.generate();
    Graphic.hero(hero);
    Graphic.hero(npc, { isHero: false });
    Logger.verbose(`${colors.bold(colors.green(npc.getName()))} Let's have a battle\n`, null, { timestamp: false });

    await this.eventEmitter.emitAsync(RoomEventEvent.BATTLE_STARTED, game);

    await this.fight(hero, npc);

    if (!npc.getCharacteristics().health) {
      BattleUtils.resetNpc(hero);
      Logger.warn(colors.blue(`You defeat your enemy. Uhahahahaha!!!!\n`));
    }

    if (!hero.getCharacteristics().health) {
      Logger.error(colors.blue(`You are dead. Goodbye looser\n`));
      Graphic.death();
      await this.eventEmitter.emitAsync(HeroEvent.DEAD, this.context.get<Game>('game'));
      return;
    }

    await this.eventEmitter.emitAsync(RoomEventEvent.BATTLE_COMPLETED, game);

    this.scenario.addScript(this.battleRewardRoomEventScript);
  }

  private async fight(hero: Hero, npc: Npc): Promise<void> {
    let isHeroTurn = true;

    while (hero.getCharacteristics().health > 0 && npc.getCharacteristics().health > 0) {
      await this.inquirer.ask<BattleTurnInitParams>(BATTLE_TURN_INIT_QS, {
        [BATTLE_TURN_INIT]: undefined,
      });
      if (isHeroTurn) {
        Logger.warn(colors.blue('Your turn\n'));
        await this.heroTurn(hero, npc);
      } else {
        Logger.warn(colors.red('NPC turn\n'));
        await this.npcTurn(hero, npc);
      }
      Graphic.hero(hero);
      Graphic.hero(npc, { isHero: false });
      isHeroTurn = !isHeroTurn;
    }
  }

  private turn(
    owner: ICharacteristicsManager,
    opponent: ICharacteristicsManager,
    attack: BattleAttack,
  ): Promise<string> {
    return BattleAttackFactory.create(owner, opponent, attack).run();
  }

  private async heroTurn(hero: Hero, npc: Npc): Promise<void> {
    const { battleAttack } = await this.inquirer.ask<BattleAttackParams>(BATTLE_ATTACK_QS, {
      [BATTLE_ATTACK]: undefined,
    });
    const result = await this.turn(hero, npc, battleAttack);

    Logger.warn(colors.blue(result));
  }

  private async npcTurn(hero: Hero, npc: Npc): Promise<void> {
    const result = await this.turn(npc, hero, BattleUtils.getNpcAttack(npc));

    Logger.warn(colors.red(result));
  }
}
