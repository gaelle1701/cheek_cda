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
  app.use('/static', express.static('uploads'));

  app.use('/api/auth', authRoutes);
  app.use('/api/addresses', addressRoutes);
  app.use('/api/carts', cartRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/invoices', invoiceRoutes);
  app.use('/api/mailer', mailerRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/order-lines', orderLineRoutes);
  app.use('/api/pictures', pictureRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/product-details', productDetailsRoutes);
  app.use('/api/sizes', sizeRoutes);
  app.use('/api/users', userRoutes);
}
