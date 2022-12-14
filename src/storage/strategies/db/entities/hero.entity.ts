import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Uuid } from '@game/game.types';
import { GameEntity } from '@db-storage/entities/game.entity';
import { CharacteristicsEntity } from '@db-storage/entities/characteristics.entity';
import { HeroRoomEntity } from '@db-storage/entities/hero-room.entity';
import { Race } from '@game/npc/npc.enums';

@Entity({ name: 'heroes' })
export class HeroEntity {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: Uuid;

  @Column({ type: 'uuid', nullable: false })
  game_id: Uuid;

  @Column({ type: 'uuid', nullable: false })
  player_id: Uuid;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  race: Race;

  @Column({ type: 'uuid', nullable: false })
  characteristics_id?: Uuid;

  @Column({ type: 'integer' })
  x: number;

  @Column({ type: 'integer' })
  y: number;

  @ManyToOne(() => GameEntity, game => game.heroes, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'game_id', referencedColumnName: 'id' })
  game: GameEntity;

  @OneToOne(() => CharacteristicsEntity, { eager: true, cascade: true })
  @JoinColumn({ name: 'characteristics_id', referencedColumnName: 'id' })
  characteristics: CharacteristicsEntity;

  @OneToMany(() => HeroRoomEntity, room => room.hero, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'hero_id' })
  rooms: HeroRoomEntity[];
}
