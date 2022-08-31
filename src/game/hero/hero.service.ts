import { Injectable } from '@nestjs/common';
import { Creatable, Restorable } from '@game/game.interfaces';
import { InjectStorage } from '@storage/storage.inject.decorator';
import { Storage } from '@storage/storage';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Context } from '@context/context';
import { HeroEvent, Race } from '@game/hero/hero.enums';
import { Game } from '@game/game';
import { Hero } from '@game/hero/hero';
import { Snapshot } from '@storage/storage.types';
import { HeroState } from '@game/hero/hero.state';
import { HeroUtils } from "@game/hero/hero.utils";

@Injectable()
export class HeroService implements Creatable, Restorable {
  constructor(
    @InjectStorage() private readonly storage: Storage,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(game: Game, name: string, race: Race): Promise<Hero> {
    const hero = Hero.create({ name, race }).setState(HeroState.create());
    HeroUtils.applyRace(hero, race);

    game.setHero(hero);

    await this.eventEmitter.emitAsync(HeroEvent.CREATED, game);

    return hero;
  }

  async restore(game: Game, heroSnapshot: Snapshot.Hero): Promise<Hero> {
    const hero = Hero.create({ name: heroSnapshot.name, race: heroSnapshot.race, uuid: heroSnapshot.uuid })
      .setState(HeroState.create(heroSnapshot.characteristics.uuid))
      .updateCharacteristics(heroSnapshot.characteristics.data);

    game.setHero(hero);

    await this.eventEmitter.emitAsync(HeroEvent.RESTORED, game);

    return hero;
  }
}
