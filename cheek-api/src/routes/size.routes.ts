import { Router } from 'express';
import SizeController from '../controllers/size.controller';

const sizeRoutes = Router();
const sizeController = new SizeController();

sizeRoutes.post('/', sizeController.create);
sizeRoutes.get('/', sizeController.getSizes);
sizeRoutes.get('/:id', sizeController.getById);
sizeRoutes.put('/:id', sizeController.update);
sizeRoutes.delete('/:id', sizeController.destroy);

export default sizeRoutes;
