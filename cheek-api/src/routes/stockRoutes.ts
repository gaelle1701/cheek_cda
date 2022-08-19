import { Router } from "express";
import StockController from '../controllers/stockController';

const stockRoutes = Router();

stockRoutes.post('/stocks/new', StockController.create);

stockRoutes.get('/stocks', StockController.getStocks);
stockRoutes.get('/stocks/:id', StockController.getById);

stockRoutes.put('/stocks/edit/:id', StockController.update);

stockRoutes.delete('/stocks/delete/:id', StockController.destroy);

//permit(Role.Admin
export default stockRoutes