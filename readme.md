Node project

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
- Celebrate for api input validations

### Running in Dev Enviroment
Running the app:
`npm run dev:server`

Running the Postgres in a container:
`docker run --name my_container_postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

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
[ ] configurar debugging
[ ] refatorar os nomes dos repos e as pastas
[ ] verificar como fazer o vinculo de user e workspace
[ ] database with .env
[ ] unit tests

[ ] refresh token
[ ] husky precommit and pre push
[ ] integration tests
