Boilerplate for MVP node projects

With:
- Eslint Configured
- Prettier Configured
- Typescript
- Dev enviroment
- VS Code debugger setup
- TypeORM (+Migrations Setup)
- Modules/DDD folders struct
- Unity Tests with jest + code coverage
- DI with tsyringe

### Running in Dev Enviroment
Running the app:
`npm run dev:server`

Running a Postgres container:
`docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

### Migrations

Running migrations:
`npm run typeorm migrations:run`

Creating a migration:
`npm run typeorm -- migration:create --name CreateUsers`

Migration example:
```
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1600772700374
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
```

#### Next Steps
+ validações de parametros (joy + celebrate)
+ refresh token
+ .env
+ husky precommit and pre push
+ integration tests

