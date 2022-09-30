import * as cors from 'cors';

const corsMiddleware = cors({
  origin: [process.env.APP_URL],
  header: ['Access-Control-Allow-Origin', process.env.APP_URL],
  credentials: true,
});

export default corsMiddleware;
