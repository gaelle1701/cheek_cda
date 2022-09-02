import { AppDataSource } from '../config/data-source';
import { OrderLine } from '../entities/OrderLine';
import { DeepPartial } from 'typeorm';

export const orderLineRepository = AppDataSource.getRepository(
  OrderLine,
).extend({
  async createOrderLine(orderLine: DeepPartial<OrderLine>) {
    const createOrderLine = orderLineRepository.create(orderLine);
    return await orderLineRepository.save(createOrderLine);
  },
  async findBydId(id: number) {
    return await orderLineRepository.findOneBy({
      id,
    });
  },
});
