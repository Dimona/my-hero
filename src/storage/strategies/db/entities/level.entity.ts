import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { LevelRoomEntity } from '@db-storage/entities/level-room.entity';
import { Uuid } from '@game/game.types';

@Entity({ name: 'levels' })
export class LevelEntity {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: Uuid;

  @Column({ type: 'varchar', length: 100, default: 'Scary level', nullable: false })
  name: string;

  @CreateDateColumn()
  created_at?: Date;

  @Column({ type: 'uuid', nullable: false })
  game_id: Uuid;

  @OneToMany(() => LevelRoomEntity, levelRoom => levelRoom.level, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'level_id' })
  rooms?: LevelRoomEntity[];
}
