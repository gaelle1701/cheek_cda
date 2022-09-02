import { AppDataSource } from '../config/data-source';
import { Order } from '../entities/Order';
import { DeepPartial } from 'typeorm';

export const orderRepository = AppDataSource.getRepository(Order).extend({
  async createOrder(order: DeepPartial<Order>) {
    const createOrder = orderRepository.create(order);
    return await orderRepository.save(createOrder);
  },
  async findBydId(id: number) {
    return await orderRepository.findOneBy({
      id,
    });
  },
});
