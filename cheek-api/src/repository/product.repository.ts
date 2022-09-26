import { AppDataSource } from '../config/data-source';
import { Product } from '../entities/Product';
import { DeepPartial } from 'typeorm';
import { productDetailRepository } from './product-detail.repository';

export const productRepository = AppDataSource.getRepository(Product).extend({
  async createProduct(product: DeepPartial<Product>) {
    const createProduct = productRepository.create(product);
    const savedProduct = await productRepository.save(createProduct);

    if (product?.details?.length >= 0) {
      await Promise.all(
        product.details.map(async (detail) => {
          await productDetailRepository.createProductDetail({
            product: savedProduct.id,
            ...detail,
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
        'details',
        'details.size',
      ],
    });
  },
});
