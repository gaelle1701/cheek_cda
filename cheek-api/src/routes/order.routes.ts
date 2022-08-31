import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.post('/', orderController.create);
orderRoutes.get('/', orderController.getOrders);
orderRoutes.get('/:id', orderController.getById);
orderRoutes.put('/:id', orderController.update);
orderRoutes.delete('/:id', orderController.destroy);

export default orderRoutes;
