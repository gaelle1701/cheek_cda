import { Request, Response } from 'express';
import { orderRepository } from '../repository/order.repository';

class OrderController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      const savedOrder = await orderRepository.createOrder(req.body);
      return res.send(savedOrder);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getOrders(req: Request, res: Response) {
    try {
      let query = {};

      if (req.query.userId) {
        query = { user: { id: req.query.userId } };
      }

      const getOrders = await orderRepository.find({
        where: query,
        relations: ['user', 'orderLines', 'orderLines.product'],
      });
      return res.send(getOrders);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const order = await orderRepository.findById(+req.params.id);
      if (!order) {
        return res.status(400).send({
          message: "This order doesn't exist",
        });
      }
      return res.send(order);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const order = await orderRepository.findById(+req.params.id);
      if (!order) {
        return res.status(400).send({
          message: "This order doesn't exist !",
        });
      }

      const updateOrder = await orderRepository.save(
        Object.assign(order, req.body),
      );
      if (updateOrder.affected === 1) {
        return res.status(200).send({
          message: 'The order with id= ' + order.id + ' has been updated !',
        });
      }

      return res.send(updateOrder);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    const order = await orderRepository.findById(+req.params.id);
    try {
      if (!order) {
        return res.status(400).send({
          message: "This order doesn't exist",
        });
      }

      const deleteOrder = await orderRepository.delete(order.id);
      if (deleteOrder.affected === 1) {
        return res.status(200).send({
          message: `The order with id=${order.id} has been deleted successfully !`,
        });
      }

      return res.send(deleteOrder);
    } catch (error) {
      return res.status(500).send({
        message: `Could not delete order with id=${order.id}`,
      });
    }
  }
}

export default OrderController;
