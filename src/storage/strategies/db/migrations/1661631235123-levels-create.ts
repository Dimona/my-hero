import { MigrationInterface, QueryRunner } from 'typeorm';

export class LevelsCreate1661631235123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists levels (
        id uuid not null primary key,
        name varchar(100) default 'Scary level' not null,
        created_at timestamp without time zone not null default now(),
        game_id uuid not null
          constraint levels_game_id_fk references games (id) on delete cascade
      );
    `);
    await queryRunner.query(`
      create table if not exists level_rooms (
        id uuid not null primary key,
        level_id  uuid not null
          constraint level_rooms_level_id_fk references levels (id) on delete cascade,
        x integer not null,
        y integer not null,
        left_wall boolean default true not null,
        top_wall  boolean default true not null,
        right_wall boolean default true not null,
        bottom_wall  boolean default true not null
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('levels', true);
    await queryRunner.dropTable('level_rooms', true);
  }
}
