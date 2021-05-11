import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRecoveryPasswordToken1620692270476
  implements MigrationInterface {
  private tableName = 'recovery_password_token';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,

        columns: [
          {
            name: 'token',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },

          {
            name: 'user_id',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'date',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
