import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', userController.create);
userRoutes.get('/', userController.getUsers);
userRoutes.get('/:id', userController.getById);
userRoutes.put('/:id', userController.update);
userRoutes.delete('/:id', userController.destroy);

//permit(Role.Admin
export default userRoutes;
