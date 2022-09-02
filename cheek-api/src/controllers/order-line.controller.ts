import { Request, Response } from 'express';
import { orderLineRepository } from '../repository/order-line.repository';

class OrderLineController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      const savedOrderLine = await orderLineRepository.createOrderLine(
        req.body,
      );
      return res.send(savedOrderLine);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getOrderLines(req: Request, res: Response) {
    try {
      const getOrderLines = await orderLineRepository.find();
      return res.send(getOrderLines);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const orderLine = await orderLineRepository.findBydId(+req.params.id);
      if (!orderLine) {
        return res.status(400).send({
          message: "This orderLine doesn't exist",
        });
      }
      return res.send(orderLine);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const orderLine = await orderLineRepository.findBydId(+req.params.id);
      if (!orderLine) {
        return res.status(400).send({
          message: "This orderLine doesn't exist !",
        });
      }

      const updateOrderLine = await orderLineRepository.save(
        Object.assign(orderLine, req.body),
      );
      if (updateOrderLine.affected === 1) {
        return res.status(200).send({
          message:
            'The order line with id= ' + orderLine.id + ' has been updated !',
        });
      }

      return res.send(updateOrderLine);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    const orderLine = await orderLineRepository.findBydId(+req.params.id);
    try {
      if (!orderLine) {
        return res.status(400).send({
          message: "This orderLine doesn't exist",
        });
      }

      const deleteAddress = await orderLineRepository.delete(orderLine.id);
      if (deleteAddress.affected === 1) {
        return res.status(200).send({
          message: `The order line with id=${orderLine.id} has been deleted successfully !`,
        });
      }

      return res.send(deleteAddress);
    } catch (error) {
      return res.status(500).send({
        message: `Could not delete order line with id=${orderLine.id}`,
      });
    }
  }
}

export default OrderLineController;
