import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Uuid } from '@game/game.types';
import { HeroRoomStatus } from '@game/hero/hero.enums';
import { HeroEntity } from '@db-storage/entities/hero.entity';
import { LevelRoomEntity } from '@db-storage/entities/level-room.entity';

@Entity({ name: 'hero_rooms' })
export class HeroRoomEntity {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: Uuid;

  @Column({ type: 'uuid', nullable: false })
  hero_id: Uuid;

  @Column({ type: 'uuid', nullable: false })
  room_id: Uuid;

  @Column({ type: 'varchar', nullable: false, default: HeroRoomStatus.PENDING })
  status: HeroRoomStatus;

  @ManyToOne(() => HeroEntity, hero => hero.rooms, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'hero_id', referencedColumnName: 'id' })
  hero?: HeroEntity;

  @OneToOne(() => LevelRoomEntity, { eager: true, cascade: true })
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  level_room: LevelRoomEntity;
}
