import { Router } from 'express';
import PriceController from '../controllers/price.controller';
import permit from '../middleware/permit.middleware';
import { ERole } from '../entities/User';

const priceRoutes = Router();
const priceController = new PriceController();

priceRoutes.get('/', priceController.getPrices);
priceRoutes.get('/:id', priceController.getById);

priceRoutes.post('/', permit(ERole.ADMIN), priceController.create);
priceRoutes.put('/:id', permit(ERole.ADMIN), priceController.update);
priceRoutes.delete('/:id', permit(ERole.ADMIN), priceController.destroy);

export default priceRoutes;
