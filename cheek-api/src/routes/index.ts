import * as express from 'express';
import type { Application } from 'express';

import authRoutes from './auth.routes';
import addressRoutes from './address.routes';
import cartRoutes from './cart.routes';
import invoiceRoutes from './invoice.routes';
import categoryRoutes from './category.routes';
import mailerRoutes from './mailer.routes';
import orderRoutes from './order.routes';
import pictureRoutes from './picture.routes';
import orderLineRoutes from './order-line.routes';
import productRoutes from './product.routes';
import productDetailsRoutes from './product-detail.routes';
import userRoutes from './user.routes';
import sizeRoutes from './size.routes';



export function addRoutes(app: Application) {
  // serve static files(images, etc...)
  app.use('/static', express.static('tmp'));

  app.use('/auth', authRoutes);
  app.use('/addresses', addressRoutes);
  app.use('/carts', cartRoutes);
  app.use('/categories', categoryRoutes);
  app.use('/invoices', invoiceRoutes);
  app.use('/mailer', mailerRoutes);
  app.use('/orders', orderRoutes);
  app.use('/order-lines', orderLineRoutes);
  app.use('/pictures', pictureRoutes);
  app.use('/products', productRoutes);
  app.use('/product-details', productDetailsRoutes);
  app.use('/sizes', sizeRoutes);
  app.use('/users', userRoutes);
}
