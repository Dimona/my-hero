import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Uuid } from '@game/game.types';

@Entity({ name: 'characteristics' })
export class CharacteristicsEntity {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: Uuid;

  @Column({ type: 'integer', nullable: false })
  health: number;

  @Column({ type: 'integer', nullable: false })
  max_health: number;

  @Column({ type: 'integer', nullable: false })
  manna: number;

  @Column({ type: 'integer', nullable: false })
  max_manna: number;

  @Column({ type: 'integer', nullable: false })
  physical_attack: number;

  @Column({ type: 'integer', nullable: false })
  physical_defense: number;

  @Column({ type: 'integer', nullable: false })
  magical_attack: number;

  @Column({ type: 'integer', nullable: false })
  magical_defense: number;
}
