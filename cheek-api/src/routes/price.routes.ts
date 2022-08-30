import { Router } from 'express';
import PriceController from '../controllers/price.controller';

const priceRoutes = Router();
const priceController = new PriceController();

priceRoutes.post('/', priceController.create);
priceRoutes.get('/', priceController.getPrices);
priceRoutes.get('/:id', priceController.getById);
priceRoutes.put('/:id', priceController.update);
priceRoutes.delete('/:id', priceController.destroy);

export default priceRoutes;
