import { Column, Entity, OneToOne, PrimaryColumn, JoinColumn, OneToMany } from 'typeorm';
import { GameStatus } from '@game/game.enums';
import { LevelEntity } from '@db-storage/entities/level.entity';
import { HeroEntity } from '@db-storage/entities/hero.entity';
import { Uuid } from '@game/game.types';

@Entity({ name: 'games' })
export class GameEntity {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: Uuid;

  @Column({ type: 'varchar', length: 100, nullable: false, default: GameStatus.PENDING_START })
  status: GameStatus;

  @Column({ type: 'timestamp without time zone', nullable: true })
  started_at?: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  finished_at?: Date;

  @OneToOne(() => LevelEntity, { eager: true, cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'game_id' })
  level: LevelEntity;

  @OneToMany(() => HeroEntity, hero => hero.game, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'game_id' })
  heroes?: HeroEntity[];
}
