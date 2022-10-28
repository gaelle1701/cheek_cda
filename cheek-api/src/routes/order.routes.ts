import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import permit from '../middleware/permit.middleware';
import { ERole } from '../entities/User';

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.get('/', orderController.getOrders);
orderRoutes.get('/:id', orderController.getById);

orderRoutes.post('/', permit(ERole.CUSTOMER), orderController.create);

export default orderRoutes;
