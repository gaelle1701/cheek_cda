import { Application } from 'express';
import addressRoutes from './addressRoutes';
import priceRoutes from './priceRoutes';
import categoryRoutes from './categoryRoutes';
import sizeRoutes from './sizeRoutes';
import stockRoutes from './stockRoutes';
import userRoutes from './userRoutes';

const routes = [
  priceRoutes,
  addressRoutes,
  categoryRoutes,
  sizeRoutes,
  stockRoutes,
  userRoutes,
];

export function addRoutes(app: Application) {
  app.use(routes);
}
