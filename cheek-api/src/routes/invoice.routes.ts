import { Router } from 'express';
import InvoiceController from '../controllers/invoice.controller';
import permit from '../middleware/permit.middleware';
import { ERole } from '../entities/User';

const invoiceRoutes = Router();
const invoiceController = new InvoiceController();

invoiceRoutes.get('/', invoiceController.getInvoices);
invoiceRoutes.get('/:id', invoiceController.getById);

invoiceRoutes.post('/', permit(ERole.CUSTOMER), invoiceController.create);
invoiceRoutes.put('/:id', permit(ERole.ADMIN), invoiceController.update);
invoiceRoutes.delete('/:id', permit(ERole.ADMIN), invoiceController.destroy);

export default invoiceRoutes;
