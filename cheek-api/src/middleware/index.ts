import { Application } from 'express';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';

export function addMiddlewares(app: Application) {
  // parse application/json
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: [process.env.APP_URL],
      header: ['Access-Control-Allow-Origin', process.env.APP_URL],
    }),
  );

  //app.use(authMiddleware)

  if (process.env.NODE_ENV === 'production') {
    app.disable('x-powered-by');
    app.use(compression());
  }
}
