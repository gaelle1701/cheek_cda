import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'http',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exception.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' }),
  ],
});

export default logger;
