import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post('/', productController.create);
productRoutes.get('/', productController.getProducts);
productRoutes.get('/:id', productController.getById);
productRoutes.put('/:id', productController.update);
productRoutes.delete('/:id', productController.destroy);

export default productRoutes;
