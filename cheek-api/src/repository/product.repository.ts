import { AppDataSource } from '../config/data-source';
import { Product } from '../entities/Product';
import { DeepPartial } from 'typeorm';

export const productRepository = AppDataSource.getRepository(Product).extend({
  async createProduct(product: DeepPartial<Product>) {
    const createProduct = productRepository.create(product);
    return await productRepository.save(createProduct);
  },
  async findBydId(id: number) {
    return await productRepository.findOneBy({
      id,
    });
  },
});
