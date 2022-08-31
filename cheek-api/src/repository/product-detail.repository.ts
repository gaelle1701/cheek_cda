import { AppDataSource } from '../data-source';
import { ProductDetail } from '../entities/ProductDetail';

export const productDetailRepository = AppDataSource.getRepository(
  ProductDetail,
).extend({
  async createProductDetail(productDetail: ProductDetail) {
    const createProductDetail = productDetailRepository.create(productDetail);
    return await productDetailRepository.save(createProductDetail);
  },
  async findBydId(id: number) {
    return await productDetailRepository.findOneBy({
      id,
    });
  },
});
