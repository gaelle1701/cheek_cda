import { Router } from 'express';
import AddressController from '../controllers/addressController';

const addressRoutes = Router();

addressRoutes.post('/addresses/new', AddressController.create);
addressRoutes.get('/addresses', AddressController.getAddresses);
addressRoutes.get('/addresses/:id', AddressController.getById);
addressRoutes.put('/addresses/edit/:id', AddressController.update);
addressRoutes.delete('/addresses/delete/:id', AddressController.destroy);

//permit(Role.Admin
export default addressRoutes;
