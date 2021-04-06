<p align="center">
  <h3 align="center">Blogfy CMS</h3>

  <p align="center">
    A simple and ready-to-use Blog CMS for people who just want to write articles without worrying about tech stuff!
    <br />
  Watch the project development live on twitch: <a href="https://www.twitch.tv/wilsonnetodev" target="_blank">twitch.tv/wilsonnetodev</a>
    <br />
  </p>
</p>

<hr />

### Using:
<dl>
  <dt><strong>TypeORM</strong></dt>
  <dd>We need a good ORM to deal with persistence stuff</dd>
  
  <dt><strong>Clean Architecture</strong></dt>
  <dd>Using a modular DDD approach with Clean Architecture</dd>
  
  <dt><strong>Celebrate and JOI</strong></dt>
  <dd>Libs for validatint inputs from clients</dd>
  
  <dt><strong>Express</strong></dt>
  <dd>The API framework</dd>
  
  <dt><strong>Bcryptjs</strong></dt>
  <dd>Lib to deal with criptography stuff</dd>

  <dt><strong>jsonwebtoken</strong></dt>
  <dd>Lib to deal with JWT tokens</dd>

  <dt><strong>Jest</strong></dt>
  <dd>Using jest for the unity tests</dd>
  
  <dt><strong>Tsyringe</strong></dt>
  <dd>Dependency Injection library</dd>
  
  <dt><strong>Supertest</strong></dt>
  <dd>Using supertest for integrations tests</dd>
  
  <dt><strong>Typescript</strong></dt>
  <dd>For typing the JS</dd>
  
  <dt><strong>Eslint</strong> and <strong>Prettier</strong></dt>
  <dd>Used to guarantee code standards</dd>
</dl>

<hr />


### Running in Dev Enviroment
First of all, you will need to install the dependencies:<br />
`npm install`

Running the app:<br />
`npm run dev`

Running the tests:<br />
`npm run test`

Running the tests on watch mode:<br />
`npm run test:watch`

Running the integration tests:<br />
`npm run test:integration`

Running the Postgres in a container:<br />
`docker run --name my_container_postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

<hr />

### Migrations

Running migrations:
`npm run typeorm migration:run`

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

