/* eslint-disable import/prefer-default-export */
import { ConnectionOptions } from 'typeorm';
import enviromentConfig from './src/config/database';

export const config: ConnectionOptions = {
  name: enviromentConfig.name,
  type: enviromentConfig.type,
  host: enviromentConfig.host,
  port: enviromentConfig.port,
  username: enviromentConfig.username,
  password: enviromentConfig.password,
  database: enviromentConfig.database,
  logging: enviromentConfig.logging,

  extra: {
    ssl: false,
    /* {
      rejectUnauthorized: false,
    } */
  },

  entities: ['./src/**/typeorm/schemas/*.{ts,js}'],
  migrations: ['./src/**/migrations/*.ts'],
  cli: {
    migrationsDir: './src/**/migrations',
  },
};

module.exports = config;
