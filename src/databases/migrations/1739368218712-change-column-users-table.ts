import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class ChangeColumnUsersTable1739368218712 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Option 1
    await queryRunner.changeColumn(
      'users',
      'name',
      new TableColumn({
        name: 'fullName',
        type: 'varchar(100)',
      })
    )

    // Option 2
    // await queryRunner.renameColumn('users', 'name', 'fullName')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Option 1
    await queryRunner.changeColumn(
      'users',
      'fullName',
      new TableColumn({
        name: 'name',
        type: 'varchar(100)',
      })
    )

    // Option 2
    // await queryRunner.renameColumn('users', 'fullName', 'name')
  }

}
