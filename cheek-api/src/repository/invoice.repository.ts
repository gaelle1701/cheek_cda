import { AppDataSource } from '../data-source';
import { Invoice } from '../entities/Invoice';

export const invoiceRepository = AppDataSource.getRepository(Invoice).extend({
  async createInvoice(invoice: Invoice) {
    const createInvoice = invoiceRepository.create(invoice);
    return await invoiceRepository.save(createInvoice);
  },
  async findBydId(id: number) {
    return await invoiceRepository.findOneBy({
      id,
    });
  },
});
