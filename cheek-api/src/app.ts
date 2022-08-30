import 'reflect-metadata';
import 'dotenv/config';
import * as express from 'express';

import { AppDataSource } from './data-source';
import { addRoutes } from './routes';
import { addMiddlewares } from './middleware';

// self invoke
(async () => {
  try {
    const app = express();
    const port = process.env.PORT || 3001;

    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    addMiddlewares(app);
    addRoutes(app);

    app.listen(port, () => {
      return console.log(`App listen on port, ${port}`);
    });
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
  }
})();
