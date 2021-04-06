type DatabaseTypes = 'postgres';

interface IDatabaseConfiguration {
  name: string;
  type: DatabaseTypes;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
}

const config: IDatabaseConfiguration = {
  name: process.env.DATABASE_LABEL!,
  type: process.env.DATABASE_TYPE! as DatabaseTypes,
  host: process.env.DATABASE_HOST!,
  port: parseInt(process.env.DATABASE_PORT!, 10),
  username: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  logging: process.env.DATABASE_LOGGING?.toLowerCase() === 'true',
};

export default config;
