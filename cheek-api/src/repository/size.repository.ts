import { AppDataSource } from '../config/data-source';
import { Size } from '../entities/Size';
import { DeepPartial } from 'typeorm';

export const sizeRepository = AppDataSource.getRepository(Size).extend({
  async createSize(size: DeepPartial<Size>) {
    const createSize = sizeRepository.create(size);
    return await sizeRepository.save(createSize);
  },
  async findBydId(id: number) {
    return await sizeRepository.findOneBy({
      id,
    });
  },
});
