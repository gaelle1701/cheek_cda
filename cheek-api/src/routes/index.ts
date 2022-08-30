import { Application } from 'express';

import addressRoutes from './address.routes';
import priceRoutes from './price.routes';
import categoryRoutes from './category.routes';
import sizeRoutes from './size.routes';
import userRoutes from './user.routes';
import productDetailRoutes from './product-detail.routes';

export function addRoutes(app: Application) {
  app.use('/categories', categoryRoutes);
  app.use('/prices', priceRoutes);
  app.use('/addresses', addressRoutes);
  app.use('/sizes', sizeRoutes);
  app.use('/users', userRoutes);
  app.use('/product-details', productDetailRoutes);
}
