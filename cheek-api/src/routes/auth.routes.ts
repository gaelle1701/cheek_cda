import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import permit from '../middleware/permit.middleware';
import { ERole } from '../entities/User';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/signup', authController.signup);
authRoutes.post('/login', authController.login);
authRoutes.post('/refresh-token', authController.refreshToken);
authRoutes.get('/profile', permit(ERole.CUSTOMER, ERole.ADMIN), authController.getProfile);
authRoutes.put('/edit-profile/:id', permit(ERole.CUSTOMER, ERole.ADMIN), authController.updateProfile);

export default authRoutes;
