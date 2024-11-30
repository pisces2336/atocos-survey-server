import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const ormconfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [process.cwd() + '/dist/**/entities/**/*.entity.js'],
  migrations: [process.cwd() + '/dist/**/migrations/**/*.js'],
};

export default new DataSource(ormconfig);
