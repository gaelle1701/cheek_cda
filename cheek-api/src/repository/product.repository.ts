import { AppDataSource } from '../config/data-source';
import { Product } from '../entities/Product';
import { DeepPartial } from 'typeorm';
import { productDetailRepository } from './product-detail.repository';

export const productRepository = AppDataSource.getRepository(Product).extend({
  async createProduct(product: DeepPartial<Product>) {
    const createProduct = productRepository.create(product);
    const savedProduct = await productRepository.save(createProduct);

    return savedProduct;
  },
  
  async findBydId(id: number) {
    return await productRepository.findOne({
      where: { id },
      relations: [
        'category',
        'details',
        'details.size',
        'pictures'
      ],
    });
  },
});
