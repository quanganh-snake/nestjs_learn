import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUserTable1739363602775 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(50)',
          },
          {
            name: 'email',
            type: 'varchar(100)',
            // isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    // await queryRunner.query(`CREATE UNIQUE INDEX users_email_unique ON users (email)`)
    await queryRunner.createIndex('users', new TableIndex({
      name: 'users_email_unique',
      columnNames: ['email'],
      isUnique: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }

}
