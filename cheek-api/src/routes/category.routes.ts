import { Router } from 'express';
import CategoryController from '../controllers/category.controller';

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post('/', categoryController.create);
categoryRoutes.get('/', categoryController.getCategories);
categoryRoutes.get('/:id', categoryController.getById);
categoryRoutes.put('/:id', categoryController.update);
categoryRoutes.delete('/:id', categoryController.destroy);

//permit(Role.Admin
export default categoryRoutes;
