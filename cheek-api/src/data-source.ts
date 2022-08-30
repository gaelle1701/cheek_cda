import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: +process.env.DB_PORT ?? 8889,
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'cheek',
  entities: ['src/entities/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
});
