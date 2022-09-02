import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.production',
});

import { AppDataSource } from './config/data-source';
import { addRoutes } from './routes';
import { addMiddlewares } from './middleware';
import logger from './config/winston';

// self invoke
(async () => {
  try {
    const app = express();
    const port = process.env.PORT || 3001;

    await AppDataSource.initialize();
    logger.info('Data Source has been initialized!');

    addMiddlewares(app);
    addRoutes(app);

    app.listen(port, () => {
      logger.info(`App listen on port, http://localhost:${port}`);
    });
  } catch (err) {
    logger.error('Data Source has been initialized!', err);
  }
})();
