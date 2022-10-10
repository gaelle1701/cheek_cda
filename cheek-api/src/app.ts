import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cloudinary from 'cloudinary';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.production',
});

import { AppDataSource } from './config/data-source';
import { addRoutes } from './routes';
import { addMiddlewares } from './middleware';
import logger from './config/winston';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: process.env.NODE_ENV === 'production',
});

// self invoke
(async () => {
  try {
    const app = express();
    const port = process.env.PORT || 3001;

    await AppDataSource.initialize();
    logger.info('Data Source has been initialized!');

    addMiddlewares(app);
    addRoutes(app);

    app.listen(port as number, () => {
      logger.info(`App listen on port, http://localhost:${port}`);
    });
  } catch (err) {
    logger.error('Data Source has not been initialized!', err);
  }
})();