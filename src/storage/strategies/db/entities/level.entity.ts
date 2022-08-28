import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { GameEntity } from '@db-storage/entities/game.entity';

@Entity({ name: 'levels' })
export class LevelEntity {
  @PrimaryColumn({ type: 'integer', nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 100, default: 'Scary level', nullable: false })
  name: string;

  @CreateDateColumn()
  created_at?: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  game_id: string;

  @OneToOne(() => GameEntity)
  @JoinColumn({ name: 'game_id', referencedColumnName: 'id', foreignKeyConstraintName: 'levels_game_id_fk' })
  game: GameEntity;
}
