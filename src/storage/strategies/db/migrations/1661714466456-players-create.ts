import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlayersCreate1661714466456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table players (
        id varchar(100) not null primary key,
        name varchar(255) not null,
        created_at timestamp without time zone default now(),
        active_game_id varchar(100)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('players', true);
  }
}
