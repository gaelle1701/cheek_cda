import { Router } from "express";
import SizeController from '../controllers/sizeController';

const sizeRoutes = Router();

sizeRoutes.post('/sizes/new', SizeController.create);

sizeRoutes.get('/sizes', SizeController.getSizes);
sizeRoutes.get('/sizes/:id', SizeController.getById);

sizeRoutes.put('/sizes/edit/:id', SizeController.update);

sizeRoutes.delete('/sizes/delete/:id', SizeController.destroy);

//permit(Role.Admin
export default sizeRoutes