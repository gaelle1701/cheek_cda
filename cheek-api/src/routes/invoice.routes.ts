import { Router } from 'express';
import InvoiceController from '../controllers/invoice.controller';

const invoiceRoutes = Router();
const invoiceController = new InvoiceController();

invoiceRoutes.post('/', invoiceController.create);
invoiceRoutes.get('/', invoiceController.getInvoices);
invoiceRoutes.get('/:id', invoiceController.getById);
invoiceRoutes.put('/:id', invoiceController.update);
invoiceRoutes.delete('/:id', invoiceController.destroy);

export default invoiceRoutes;
