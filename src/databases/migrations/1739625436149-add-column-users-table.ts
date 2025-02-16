import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnUsersTable1739625436149 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'username',
        type: 'varchar(100)',
        isNullable: false,
        isUnique: true
      }),
      new TableColumn({
        name: 'status',
        type: 'boolean',
      }),
      new TableColumn({
        name: 'verify_at',
        type: 'datetime',
        isNullable: true,
      })
    ]
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({
        name: 'username',
        type: 'varchar(100)',
        isNullable: false,
        isUnique: true
      }),
      new TableColumn({
        name: 'status',
        type: 'boolean',
      }),
      new TableColumn({
        name: 'verify_at',
        type: 'datetime',
        isNullable: true,
      })
    ]
    )
  }

}
