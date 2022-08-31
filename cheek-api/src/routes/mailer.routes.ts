import { Router } from 'express';
import MailerController from '../controllers/mailer.controller';

const mailerRoutes = Router();
const mailerController = new MailerController();

mailerRoutes.get('/confirm/:access_token', mailerController.confirm);

export default mailerRoutes;
