import { AppDataSource } from '../config/data-source';
import { Category } from '../entities/Category';

export const categoryRepository = AppDataSource.getRepository(Category).extend({
  async createCategory(category: Category) {
    const createAddress = categoryRepository.create(category);
    return await categoryRepository.save(createAddress);
  },
  async findBydId(id: number) {
    return await categoryRepository.findOneBy({
      id,
    });
  },
});
