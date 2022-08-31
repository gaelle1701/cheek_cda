import { AppDataSource } from '../data-source';
import { OrderLine } from '../entities/OrderLine';

export const orderLineRepository = AppDataSource.getRepository(
  OrderLine,
).extend({
  async createOrderLine(orderLine: OrderLine) {
    const createOrderLine = orderLineRepository.create(orderLine);
    return await orderLineRepository.save(createOrderLine);
  },
  async findBydId(id: number) {
    return await orderLineRepository.findOneBy({
      id,
    });
  },
});
