/* eslint-disable import/prefer-default-export */
import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: 'blogfy-development-do-user-6935033-0.b.db.ondigitalocean.com',
  port: 25060,
  username: 'doadmin',
  password: 'vqc9l64gilrtjc8r',
  database: 'blogfy-dev',
  logging: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: ['./src/**/typeorm/schemas/*.{ts,js}'],
  migrations: ['./src/**/migrations/*.ts'],
  cli: {
    migrationsDir: './src/**/migrations',
  },
};

module.exports = config;
