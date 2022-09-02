import { AppDataSource } from '../config/data-source';
import { Product } from '../entities/Product';
import { DeepPartial } from 'typeorm';
import { productDetailRepository } from './product-detail.repository';

export const productRepository = AppDataSource.getRepository(Product).extend({
  async createProduct(product: DeepPartial<Product>) {
    const createProduct = productRepository.create(product);
    const savedProduct = await productRepository.save(createProduct);

    if (product.attributes.length >= 0) {
      await Promise.all(
        product.attributes.map(async (attribute) => {
          await productDetailRepository.createProductDetail({
            product: savedProduct.id,
            ...attribute,
          });
        }),
      );
    }

    return savedProduct;
  },
  async findBydId(id: number) {
    return await productRepository.findOne({
      where: { id },
      relations: [
        'category',
        'attributes',
        'attributes.price',
        'attributes.size',
      ],
    });
  },
});
