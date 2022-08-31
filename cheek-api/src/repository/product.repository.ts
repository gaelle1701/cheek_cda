import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';

export const productRepository = AppDataSource.getRepository(Product).extend({
  async createProduct(product: Product) {
    const createProduct = productRepository.create(product);
    return await productRepository.save(createProduct);
  },
  async findBydId(id: number) {
    return await productRepository.findOneBy({
      id,
    });
  },
});
