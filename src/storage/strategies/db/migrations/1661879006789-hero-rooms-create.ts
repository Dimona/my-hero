import { MigrationInterface, QueryRunner } from 'typeorm';
import { HeroRoomStatus } from '@game/hero/hero.enums';

export class HeroRoomsCreate1661879006789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists hero_rooms  (
        id uuid not null primary key,
        hero_id uuid not null
          constraint hero_rooms_hero_id_fk references heroes (id) on delete cascade,
        room_id uuid not null
          constraint hero_rooms_room_id_fk references level_rooms (id),
        status varchar(20) not null default '${HeroRoomStatus.PENDING}'                          
      );

      alter table heroes
          add x integer,
          add y integer
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('hero_rooms', true);
    await queryRunner.dropColumn('heroes', 'current_room_id');
  }
}
