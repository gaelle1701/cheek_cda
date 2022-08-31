import { AppDataSource } from '../config/data-source';
import { Invoice } from '../entities/Invoice';
import { DeepPartial } from 'typeorm';

export const invoiceRepository = AppDataSource.getRepository(Invoice).extend({
  async createInvoice(invoice: DeepPartial<Invoice>) {
    const createInvoice = invoiceRepository.create(invoice);
    return await invoiceRepository.save(createInvoice);
  },
  async findBydId(id: number) {
    return await invoiceRepository.findOneBy({
      id,
    });
  },
});
