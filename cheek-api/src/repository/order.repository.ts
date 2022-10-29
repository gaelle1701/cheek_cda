import { AppDataSource } from '../config/data-source';
import { Order } from '../entities/Order';
import { DeepPartial } from 'typeorm';
import { orderLineRepository } from './order-line.repository';

export const orderRepository = AppDataSource.getRepository(Order).extend({
  async createOrder(order: DeepPartial<Order>) {
    const createOrder = orderRepository.create(order);
    const savedOrder = await orderRepository.save(createOrder);

    if (createOrder && order.orderLines.length >= 0) {
      await Promise.all(
        order.orderLines.map(
          async (orderLine) =>
            await orderLineRepository.createOrderLine({
              order: savedOrder.id,
              ...orderLine,
            }),
        ),
      );
    }

    return savedOrder;
  },
  async findById(id: number) {
    return await orderRepository.findOne({
      where: { id },
      relations: ['orderLines', 'orderLines.product'],
    });
  },
});
