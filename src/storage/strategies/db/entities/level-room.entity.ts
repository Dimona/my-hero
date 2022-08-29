import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { LevelEntity } from '@db-storage/entities/level.entity';

@Entity({ name: 'level_rooms' })
export class LevelRoomEntity {
  @PrimaryColumn({ type: 'varchar', length: 100, nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  level_id: string;

  @Column({ type: 'integer' })
  x: number;

  @Column({ type: 'integer' })
  y: number;

  @Column({ type: 'boolean' })
  left_wall: boolean;

  @Column({ type: 'boolean' })
  top_wall: boolean;

  @Column({ type: 'boolean' })
  right_wall: boolean;

  @Column({ type: 'boolean' })
  bottom_wall: boolean;

  @ManyToOne(() => LevelEntity, level => level.rooms, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'level_id', referencedColumnName: 'id' })
  level?: LevelEntity;
}
