import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: +process.env.DB_PORT ?? 8889,
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'cheek_dump',
  entities: [process.env.TYPEORM_ENTITIES],
  subscribers: [process.env.TYPEORM_SUBSCRIBERS],
  synchronize: true,
  logging: process.env.NODE_ENV === 'dev',
});
