import { AppDataSource } from '../config/data-source';
import { ProductDetail } from '../entities/ProductDetail';
import { DeepPartial } from 'typeorm';

export const productDetailRepository = AppDataSource.getRepository(
  ProductDetail,
).extend({
  async createProductDetail(productDetail: DeepPartial<ProductDetail>) {
    const createProductDetail = productDetailRepository.create(productDetail);
    return await productDetailRepository.save(createProductDetail);
  },
  async findBydId(id: number) {
    return await productDetailRepository.findOne({
      where: {
        id
      },
      relations: [
        "product","size", "price","picture"
      ] 
    
    });
  },
});
