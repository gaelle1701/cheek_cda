import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Address } from '../entities/Address';

export const addressRepository = AppDataSource.getRepository(Address).extend({
  async createAddress(address: Address) {
    const createAddress = addressRepository.create(address);
    return await addressRepository.save(createAddress);
  },
  async findById(id: number) {
    return await addressRepository.findOneBy({
      id,
    });
  },
});
