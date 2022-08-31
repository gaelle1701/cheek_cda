import { Router } from 'express';
import OrderLineController from '../controllers/order-line.controller';

const orderLineRoutes = Router();
const orderLineController = new OrderLineController();

orderLineRoutes.post('/', orderLineController.create);
orderLineRoutes.get('/', orderLineController.getOrderLines);
orderLineRoutes.get('/:id', orderLineController.getById);
orderLineRoutes.put('/:id', orderLineController.update);
orderLineRoutes.delete('/:id', orderLineController.destroy);

export default orderLineRoutes;
