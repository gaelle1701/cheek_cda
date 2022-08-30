import { Application } from 'express';
import addressRoutes from './addressRoutes';
import priceRoutes from './priceRoutes';
import categoryRoutes from './categoryRoutes';
import sizeRoutes from './sizeRoutes';
import userRoutes from './userRoutes';

const routes = [
  priceRoutes,
  addressRoutes,
  categoryRoutes,
  sizeRoutes,
  userRoutes,
];

export function addRoutes(app: Application) {
  app.use(routes);
}
