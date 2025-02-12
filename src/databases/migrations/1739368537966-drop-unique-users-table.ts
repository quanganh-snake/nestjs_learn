import { MigrationInterface, QueryRunner, TableUnique } from "typeorm";

export class DropUniqueUsersTable1739368537966 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // const table = await queryRunner.getTable('users')

    // for (const uniqueConstraint of table.uniques) {
    //   for (const column of uniqueConstraint.columnNames) {
    //     if (column === 'email') {
    //       await queryRunner.dropUniqueConstraint('users', uniqueConstraint.name)
    //     }
    //   }
    // }
    // await queryRunner.query(`ALTER TABLE users DROP INDEX users_email_unique`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE UNIQUE INDEX users_email_unique ON users (email)`)
  }

}
