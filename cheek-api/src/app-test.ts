import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cloudinary  from "cloudinary";

dotenv.config({
  path: '.env.test'
});

import { addRoutes } from './routes';
import { addMiddlewares } from './middleware';


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: process.env.NODE_ENV === 'production',
});


const app = express();
const port = process.env.PORT || 3001;

addMiddlewares(app);
addRoutes(app);

export default app