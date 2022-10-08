import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import permit from '../middleware/permit.middleware';
import { ERole } from '../entities/User';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/', productController.getProducts);
productRoutes.get('/:id', productController.getById);

productRoutes.post('/', permit(ERole.ADMIN), productController.create);
productRoutes.put('/:id', permit(ERole.ADMIN), productController.update);
productRoutes.delete('/:id', permit(ERole.ADMIN), productController.destroy);

export default productRoutes;
