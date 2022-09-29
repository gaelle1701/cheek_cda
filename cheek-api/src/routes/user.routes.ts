import { Router } from 'express';
import UserController from '../controllers/user.controller';
import permit from '../middleware/permit.middleware';
import { ERole } from '../entities/User';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', permit(ERole.ADMIN), userController.getUsers);
userRoutes.get('/:id', permit(ERole.ADMIN), userController.getById);

userRoutes.post('/', permit(ERole.ADMIN), userController.create);
userRoutes.put('/:id', permit(ERole.ADMIN), userController.update);
userRoutes.delete('/:id', permit(ERole.ADMIN), userController.destroy);

export default userRoutes;
