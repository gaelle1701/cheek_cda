import { Router } from 'express';
import PictureController from '../controllers/picture.controller';

const pictureRoutes = Router();
const pictureController = new PictureController();

pictureRoutes.post('/', pictureController.create);
pictureRoutes.get('/', pictureController.getPictures);
pictureRoutes.get('/:id', pictureController.getById);
pictureRoutes.put('/:id', pictureController.update);
pictureRoutes.delete('/:id', pictureController.destroy);

export default pictureRoutes;
