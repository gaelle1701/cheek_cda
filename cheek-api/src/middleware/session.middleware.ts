import * as session from 'express-session';
import { TypeormStore } from 'typeorm-store';
import { sessionRepository } from '../repository/session.repository';

const sessionMiddleware = session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new TypeormStore({ repository: sessionRepository }),
});

export default sessionMiddleware;
