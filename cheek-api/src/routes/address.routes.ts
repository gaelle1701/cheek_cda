import { Router } from 'express';
import AddressController from '../controllers/address.controller';
import permit from '../middleware/permit.middleware';
import { ERole } from '../entities/User';

const addressRoutes = Router();
const addressController = new AddressController();

addressRoutes.get('/', permit(ERole.ADMIN), addressController.getAddresses);
addressRoutes.get('/:id', permit(ERole.ADMIN), addressController.getById);

addressRoutes.post('/', permit(ERole.CUSTOMER), addressController.create);
addressRoutes.put('/:id', permit(ERole.CUSTOMER), addressController.update);
addressRoutes.delete('/:id', permit(ERole.CUSTOMER), addressController.destroy);

export default addressRoutes;
