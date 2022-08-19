import { Router } from "express";
import CategoryController from '../controllers/categoryController';

const categoryRoutes = Router();

categoryRoutes.post('/categories/new', CategoryController.create);

categoryRoutes.get('/categories', CategoryController.getCategories);
categoryRoutes.get('/categories/:id', CategoryController.getById);

categoryRoutes.put('/categories/edit/:id', CategoryController.update);

categoryRoutes.delete('/categories/delete/:id', CategoryController.destroy);

//permit(Role.Admin
export default categoryRoutes