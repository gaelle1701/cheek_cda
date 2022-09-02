import { AppDataSource } from '../config/data-source';
import { Address } from '../entities/Address';
import { DeepPartial } from 'typeorm';

export const addressRepository = AppDataSource.getRepository(Address).extend({
  async createAddress(address: DeepPartial<Address>) {
    const createAddress = addressRepository.create(address);
    return await addressRepository.save(createAddress);
  },
  async findById(id: number) {
    return await addressRepository.findOneBy({
      id,
    });
  },
});
