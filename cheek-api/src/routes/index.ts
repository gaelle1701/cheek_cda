import { Application } from 'express';

import addressRoutes from './address.routes';
import priceRoutes from './price.routes';
import categoryRoutes from './category.routes';
import sizeRoutes from './size.routes';
import userRoutes from './user.routes';
import invoiceRoutes from './invoice.routes';
import orderRoutes from './order.routes';
import orderLineRoutes from './order-line.routes';
import pictureRoutes from './picture.routes';
import productRoutes from './product.routes';
import productDetailsRoutes from './product-detail.routes';

export function addRoutes(app: Application) {
  app.use('/addresses', addressRoutes);
  app.use('/categories', categoryRoutes);
  app.use('/invoices', invoiceRoutes);
  app.use('/orders', orderRoutes);
  app.use('/order-lines', orderLineRoutes);
  app.use('/pictures', pictureRoutes);
  app.use('/prices', priceRoutes);
  app.use('/products', productRoutes);
  app.use('/product-details', productDetailsRoutes);
  app.use('/sizes', sizeRoutes);
  app.use('/users', userRoutes);
}
