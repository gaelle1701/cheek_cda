import { AppDataSource } from '../config/data-source';
import { Price } from '../entities/Price';
import { DeepPartial } from 'typeorm';

export const priceRepository = AppDataSource.getRepository(Price).extend({
  async createPrice(price: DeepPartial<Price>) {
    const createPrice = priceRepository.create(price);
    return await priceRepository.save(createPrice);
  },
  async findBydId(id: number) {
    return await priceRepository.findOneBy({
      id,
    });
  },
});
