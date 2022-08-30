import { Router } from 'express';
import ProductDetailController from '../controllers/product-detail.controller';

const productDetailsRoutes = Router();
const productDetailsController = new ProductDetailController();

productDetailsRoutes.post('/', productDetailsController.create);
productDetailsRoutes.get('/', productDetailsController.getProductDetails);
productDetailsRoutes.get('/:id', productDetailsController.getById);
productDetailsRoutes.put('/:id', productDetailsController.update);
productDetailsRoutes.delete(':id', productDetailsController.destroy);

export default productDetailsRoutes;
