import { Router } from 'express';
import AddressController from '../controllers/address.controller';

const addressRoutes = Router();
const addressController = new AddressController();

addressRoutes.post('/', addressController.create);
addressRoutes.get('/', addressController.getAddresses);
addressRoutes.get('/:id', addressController.getById);
addressRoutes.put('/:id', addressController.update);
addressRoutes.delete('/:id', addressController.destroy);

export default addressRoutes;
