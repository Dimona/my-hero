// import { MigrationInterface, QueryRunner } from 'typeorm';
//
// export class NpcsCreate1661879006789 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`
//       create table if not exists npcs  (
//         id uuid not null primary key,
//         name varchar(255) not null,
//         traits json,
//         desires json,
//         race varchar(255) not null,
//         characteristic_id uuid
//           constraint npcs_characteristic_id_fk references characteristics (id) on delete cascade
//       );
//     `);
//   }
//
//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropTable('npcs', true);
//   }
// }
