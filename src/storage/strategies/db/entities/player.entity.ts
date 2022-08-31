import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Uuid } from "@game/game.types";

@Entity({ name: 'players' })
export class PlayerEntity {
  @PrimaryColumn({ type: 'varchar', length: 100, nullable: false })
  id: Uuid;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'timestamp without time zone', nullable: false })
  created_at?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  active_game_id: Uuid;
}
