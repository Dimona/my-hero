import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlayersCreate1661714466456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists players (
        id uuid not null primary key,
        name varchar(255) not null,
        created_at timestamp without time zone default now() not null,
        active_game_id uuid
          constraint players_game_id_fk references games(id) on delete set null 
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('players', true);
  }
}
