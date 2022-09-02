import { Router } from 'express';
import CartController from '../controllers/cart.controller';

const cartRoutes = Router();
const cartController = new CartController();

cartRoutes.get('/', cartController.getCart);
cartRoutes.post('/', cartController.create);
cartRoutes.put('/item/:id', cartController.edit);
cartRoutes.delete('/item/:id', cartController.destroy);
cartRoutes.get('/reset', cartController.resetCart);

export default cartRoutes;
