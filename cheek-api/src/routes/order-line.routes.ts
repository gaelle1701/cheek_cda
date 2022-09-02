import { Router } from 'express';
import OrderLineController from '../controllers/order-line.controller';
import permit from '../middleware/permit.middleware';
import { ERole } from '../entities/User';

const orderLineRoutes = Router();
const orderLineController = new OrderLineController();

orderLineRoutes.get('/', orderLineController.getOrderLines);
orderLineRoutes.get('/:id', orderLineController.getById);

orderLineRoutes.post('/', permit(ERole.ADMIN), orderLineController.create);
orderLineRoutes.put('/:id', permit(ERole.ADMIN), orderLineController.update);
orderLineRoutes.delete(
  '/:id',
  permit(ERole.ADMIN),
  orderLineController.destroy,
);

export default orderLineRoutes;
