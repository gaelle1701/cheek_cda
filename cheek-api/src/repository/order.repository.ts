import { AppDataSource } from '../data-source';
import { Order } from '../entities/Order';

export const orderRepository = AppDataSource.getRepository(Order).extend({
  async createOrder(order: Order) {
    const createOrder = orderRepository.create(order);
    return await orderRepository.save(createOrder);
  },
  async findBydId(id: number) {
    return await orderRepository.findOneBy({
      id,
    });
  },
});
