import { MigrationInterface, QueryRunner } from 'typeorm';

const GAMES_TABLE_NAME = 'games';
const TABLE_NAME = 'levels';
const LEVEL_ROOMS_TABLE_NAME = 'level_rooms';

export class LevelsCreate1661631235123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists levels
        (
            id          serial primary key,
            name        varchar(100) default 'Scary level' not null,
            created_at  timestamp without time zone default now(),
            game_id     varchar(100) not null
        );
    `);
    await queryRunner.query(`
        alter table levels
            add constraint levels_game_id_fk
                foreign key (game_id) references games (id) on delete cascade;
    `);
    await queryRunner.query(`
        create table if not exists level_rooms
        (
            level_id  integer
                constraint level_rooms_level_id_fk
                    references levels (id),
            x         integer              not null,
            y         integer              not null,
            left_wall boolean default true not null,
            top_wall  boolean default true not null,
            right_wall boolean default true not null,
            bottom_wall  boolean default true not null,
            constraint level_rooms_pk
                primary key (level_id, x, y)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('levels', true);
  }
}
