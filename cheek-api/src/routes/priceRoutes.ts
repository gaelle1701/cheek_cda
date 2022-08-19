import { Router } from "express";
import PriceController from '../controllers/priceController';

export const priceRoutes = Router();

priceRoutes.post('/prices/new', PriceController.create);

priceRoutes.get('/prices', PriceController.getPrices);
priceRoutes.get('/prices/:id', PriceController.getById);

priceRoutes.put('/prices/edit/:id', PriceController.update);

priceRoutes.delete('/prices/delete/:id', PriceController.destroy);

//permit(Role.Admin
