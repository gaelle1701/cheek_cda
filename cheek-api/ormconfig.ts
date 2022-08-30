require('dotenv').config();

const IS_PROD = process.env.NODE_ENV === 'production';

export default {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: 3308,
  username: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'bdd_cheek2',
  cache: IS_PROD ? true : false,
  synchronize: false,
  logging: IS_PROD ? false : true,
  entities: ['src/entities/*.{js,ts}'],
  subscribers: ['src/subscribers/*.{js,ts}'],
  cli: {
    entitiesDir: 'src/entities/*.{js,ts}',
    subscribersDir: 'src/subscribers/*.{js,ts}',
  },
};
