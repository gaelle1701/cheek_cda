import { Router } from 'express';
import PictureController from '../controllers/picture.controller';
import uploader from '../helpers/uploader';
import permit from '../middleware/permit.middleware';
import { ERole } from '../entities/User';

const pictureRoutes = Router();
const pictureController = new PictureController();

pictureRoutes.get('/', pictureController.getPictures);
pictureRoutes.get('/:id', pictureController.getById);

pictureRoutes.post(
  '/',
  permit(ERole.ADMIN),
  uploader.single('picture'),
  pictureController.create,
);
pictureRoutes.put(
  '/:id',
  permit(ERole.ADMIN),
  uploader.single('picture'),
  pictureController.update,
);
pictureRoutes.delete('/:id', permit(ERole.ADMIN), pictureController.destroy);

export default pictureRoutes;
