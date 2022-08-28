import { Column, Entity, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { GameStatus } from '@game/enums/game.enums';
import { LevelEntity } from '@db-storage/entities/level.entity';

@Entity({ name: 'games' })
export class GameEntity {
  @PrimaryColumn({ type: 'varchar', length: 100, nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, default: GameStatus.PENDING_START })
  status: GameStatus;

  @Column({ type: 'timestamp without time zone', nullable: true })
  started_at?: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  finished_at?: Date;

  @OneToOne(() => LevelEntity, { eager: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'game_id' })
  level: LevelEntity;
}
