import { Router } from 'express';
import ProductDetailController from '../controllers/product-detail.controller';
import permit from '../middleware/permit.middleware';
import { ERole } from '../entities/User';

const productDetailsRoutes = Router();
const productDetailsController = new ProductDetailController();

productDetailsRoutes.get('/', productDetailsController.getProductDetails);
productDetailsRoutes.get('/:id', productDetailsController.getById);


productDetailsRoutes.post(
  '/',
  permit(ERole.ADMIN),
  productDetailsController.create,
);
productDetailsRoutes.put(
  '/:id',
  permit(ERole.ADMIN),
  productDetailsController.update,
);
productDetailsRoutes.delete(
  ':id',
  permit(ERole.ADMIN),
  productDetailsController.destroy,
);

export default productDetailsRoutes;
