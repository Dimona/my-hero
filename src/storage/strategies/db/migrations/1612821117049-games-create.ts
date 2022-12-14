import { MigrationInterface, QueryRunner } from 'typeorm';
import { GameStatus } from '@game/game.enums';

export class GamesCreate1612821117049 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists games (
        id uuid not null primary key,
        started_at timestamp without time zone,
        finished_at timestamp without time zone,
        status varchar(100) default '${GameStatus.PENDING_START}' not null
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('games', true);
  }
}
