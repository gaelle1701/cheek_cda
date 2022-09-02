import { Request, Response } from 'express';
import { invoiceRepository } from '../repository/invoice.repository';

class InvoiceController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      const savedInvoice = await invoiceRepository.createInvoice(req.body);
      return res.send(savedInvoice);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getInvoices(req: Request, res: Response) {
    try {
      const getInvoices = await invoiceRepository.find();
      return res.send(getInvoices);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const invoice = await invoiceRepository.findBydId(+req.params.id);
      if (!invoice) {
        return res.status(400).send({
          message: "This invoice doesn't exist",
        });
      }
      return res.send(invoice);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const invoice = await invoiceRepository.findBydId(+req.params.id);
      if (!invoice) {
        return res.status(400).send({
          message: "This invoice doesn't exist !",
        });
      }

      const updateInvoice = await invoiceRepository.save(
        Object.assign(invoice, req.body),
      );
      if (updateInvoice.affected === 1) {
        return res.status(200).send({
          message:
            'The invoice with id= ' + updateInvoice.id + ' has been updated !',
        });
      }

      return res.send(updateInvoice);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    const invoice = await invoiceRepository.findBydId(+req.params.id);
    try {
      if (!invoice) {
        return res.status(400).send({
          message: "This invoice doesn't exist",
        });
      }

      const deleteInvoice = await invoiceRepository.delete(invoice.id);
      if (deleteInvoice.affected === 1) {
        return res.status(200).send({
          message: `The invoice with id=${invoice.id} has been deleted successfully !`,
        });
      }

      return res.send(deleteInvoice);
    } catch (error) {
      return res.status(500).send({
        message: `Could not delete invoice with id=${invoice.id}`,
      });
    }
  }
}

export default InvoiceController;
