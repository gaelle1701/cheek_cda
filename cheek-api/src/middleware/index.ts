import { Application } from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';

import morganMiddleware from './morgan.middleware';
import corsMiddleware from './cors.middleware';
import authMiddleware from './auth.middleware';
import sessionMiddleware from './session.middleware';
import cartMiddleware from './cart.middleware';

export function addMiddlewares(app: Application) {
  // parse application/json
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(sessionMiddleware);
  app.use(authMiddleware);
  app.use(corsMiddleware);
  app.use(morganMiddleware);
  app.use(cartMiddleware);
 
  if (process.env.NODE_ENV === 'production') {
    app.disable('x-powered-by');
    app.use(compression());
  }
}
