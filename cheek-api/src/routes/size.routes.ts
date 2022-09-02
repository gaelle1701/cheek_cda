import { Router } from 'express';
import SizeController from '../controllers/size.controller';
import permit from '../middleware/permit.middleware';
import { ERole } from '../entities/User';

const sizeRoutes = Router();
const sizeController = new SizeController();

sizeRoutes.get('/', sizeController.getSizes);
sizeRoutes.get('/:id', sizeController.getById);

sizeRoutes.post('/', permit(ERole.ADMIN), sizeController.create);
sizeRoutes.put('/:id', permit(ERole.ADMIN), sizeController.update);
sizeRoutes.delete('/:id', permit(ERole.ADMIN), sizeController.destroy);

export default sizeRoutes;
