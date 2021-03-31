import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUserWorkspace1617150455946 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_workspace',
        columns: [
          {
            name: 'userId',
            type: 'uuid',
            isNullable: false
          }, {
            name: 'workspaceId',
            type: 'uuid',
            isNullable: false,
          }
        ],
        foreignKeys: [
          {
            name: 'userId_fk',
            columnNames: [ 'userId' ],
            referencedTableName: 'users',
            referencedColumnNames: [ 'id' ],
            onDelete: "SET NULL"
          },
          {
            name: 'workspaceId_fk',
            columnNames: [ 'workspaceId' ],
            referencedTableName: 'workspaces',
            referencedColumnNames: [ 'id' ],
            onDelete: "SET NULL"
          }
        ]
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_workspace');
  }

}
