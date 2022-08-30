import { Router } from 'express';
import UserController from '../controllers/userController';

const userRoutes = Router();

userRoutes.post('/users/new', UserController.create);

userRoutes.get('/users', UserController.getUsers);
userRoutes.get('/users/:id', UserController.getById);

userRoutes.put('/users/edit/:id', UserController.update);

userRoutes.delete('/users/delete/:id', UserController.destroy);

//permit(Role.Admin
export default userRoutes;
