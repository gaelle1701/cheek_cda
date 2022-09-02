import logger from '../config/winston';
import * as morgan from 'morgan';

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  },
);

export default morganMiddleware;
