import { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import { ERole } from '../entities/User';
import permit from '../middleware/permit.middleware';

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.get('/', categoryController.getCategories);
categoryRoutes.get('/:id', categoryController.getById);

categoryRoutes.post('/', permit(ERole.ADMIN), categoryController.create);
categoryRoutes.put('/:id', permit(ERole.ADMIN), categoryController.update);
categoryRoutes.delete('/:id', permit(ERole.ADMIN), categoryController.destroy);

//permit(Role.Admin
export default categoryRoutes;
