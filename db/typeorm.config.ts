import { DataSource, DataSourceOptions } from 'typeorm';
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

export const dbConfig = {};
switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'gubba',
      database: 'datajet_dev',
      synchronize: true,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      synchronize: true,
      migrationsRun: true,
      entities: ['**/*.entity.ts'],
      migrations: ['migrations/*.js'],
      cli: {
        migrationsDir: 'migrations',
      },
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: 'dpg-cb05v9j19n09vp406or0-a.singapore-postgres.render.com',
      username: 'sto_user',
      password: 'aSXIA18XqdRZnAOocMu0f4KzmNfrbLC7',
      database: 'quintech_tooljet',
      entities: ['**/*.entity.js'],
      migrations: ['migrations/*.js'],
      migrationsRun: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      cli: {
        migrationsDir: 'migrations',
      },
    });
    break;
  default:
    throw new Error('Unknown environment');
}

const dataSource = new DataSource(dbConfig as DataSourceOptions);
export default dataSource;
