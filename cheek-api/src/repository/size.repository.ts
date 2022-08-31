import { AppDataSource } from '../config/data-source';
import { Size } from '../entities/Size';

export const sizeRepository = AppDataSource.getRepository(Size).extend({
  async createSize(size: Size) {
    const createSize = sizeRepository.create(size);
    return await sizeRepository.save(createSize);
  },
  async findBydId(id: number) {
    return await sizeRepository.findOneBy({
      id,
    });
  },
});
