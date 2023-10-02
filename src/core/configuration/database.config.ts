import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { config } from 'dotenv';

config();

let datasourceOptions: TypeOrmModuleOptions = {
  type: 'mssql',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  schema: `dbo`,
  entities: [join(__dirname, '..', '..', 'modules', '**', '*.entity{.js,.ts}')],
  migrations: [
    join(__dirname, '..', 'database', 'migrations', '*.migration{.js,.ts}'),
  ],
  subscribers: [
    join(__dirname, '..', '..', 'modules', '**', '*.subscriber{.js,.ts}'),
  ],
  options: {
    encrypt: false,
  },
  synchronize: false,
  logging: 'all',
  logger: 'file',
};

switch (process.env.NODE_ENV) {
  case 'test':
    datasourceOptions = {
      ...datasourceOptions,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
    };
    break;
  case 'acceptance':
    datasourceOptions = {
      ...datasourceOptions,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
    };
    break;
  case 'production':
    datasourceOptions = {
      ...datasourceOptions,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
    };
    break;
  default:
    datasourceOptions = {
      ...datasourceOptions,
      host: 'localhost',
      port: 1433,
      database: 'hubgame_dev',
    };
    break;
}

export const datasource = datasourceOptions;

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => datasourceOptions,
);
