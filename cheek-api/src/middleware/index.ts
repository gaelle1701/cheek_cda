import { Application } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';

import morganMiddleware from './morgan.middleware';
import corsMiddleware from './cors.middleware';
import authMiddleware from './auth.middleware';

export function addMiddlewares(app: Application) {
  // parse application/json
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(authMiddleware);
  app.use(corsMiddleware);
  app.use(morganMiddleware);

  if (process.env.NODE_ENV === 'production') {
    app.disable('x-powered-by');
    app.use(compression());
  }
}
