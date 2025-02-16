import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeColumnUsersTable1739625347557 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'fullName',
      new TableColumn({
        name: 'fullname',
        type: 'varchar(100)',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'fullname',
      new TableColumn({
        name: 'fullName',
        type: 'varchar(100)',
      })
    )
  }

}
