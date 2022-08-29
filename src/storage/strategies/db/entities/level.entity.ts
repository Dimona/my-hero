import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { LevelRoomEntity } from '@db-storage/entities/level-room.entity';

@Entity({ name: 'levels' })
export class LevelEntity {
  @PrimaryColumn({ type: 'varchar', length: 100, nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 100, default: 'Scary level', nullable: false })
  name: string;

  @CreateDateColumn()
  created_at?: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  game_id: string;

  @OneToMany(() => LevelRoomEntity, levelRoom => levelRoom.level, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'level_id' })
  rooms?: LevelRoomEntity[];
}
