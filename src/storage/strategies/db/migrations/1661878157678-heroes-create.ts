import { MigrationInterface, QueryRunner } from 'typeorm';

export class HeroCreate1661878157678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists heroes  (
          id uuid not null primary key,
          name varchar(255) not null,
          game_id uuid not null
            constraint heroes_game_id_fk references games (id) on delete cascade,
          player_id uuid not null
            constraint heroes_player_id_fk references players (id) on delete cascade,
          race varchar(255) not null,
          characteristics_id uuid not null 
            constraint heroes_characteristics_id_fk references characteristics (id) on delete set null               
        );

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('heroes', true);
  }
}
