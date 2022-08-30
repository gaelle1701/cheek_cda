import { AppDataSource } from '../data-source';
import { Price } from '../entities/Price';

export const priceRepository = AppDataSource.getRepository(Price).extend({
  async createPrice(price: Price) {
    const createPrice = priceRepository.create(price);
    return await priceRepository.save(createPrice);
  },
  async findBydId(id: number) {
    return await priceRepository.findOneBy({
      id,
    });
  },
});
