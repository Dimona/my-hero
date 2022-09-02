import { MigrationInterface, QueryRunner } from 'typeorm';

export class CharacteristicsCreate1661875606567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists characteristics  (
        id uuid not null primary key,
        health integer not null,
        max_health integer not null,
        manna integer not null,
        max_manna integer not null,
        physical_attack integer not null,
        physical_defense integer not null,
        magical_attack integer not null,
        magical_defense integer not null
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('characteristics', true);
  }
}
