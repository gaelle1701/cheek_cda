import { Request, Response } from 'express';
import { priceRepository } from '../repository/price.repository';

class PriceController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        res.status(400).send({
          message: 'Content can not be empty!',
        });
        return;
      }
      const createPrice = await priceRepository.createPrice(req.body);
      return res.send(createPrice);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getPrices(req: Request, res: Response) {
    try {
      const getPrices = await priceRepository.find();
      return res.send(getPrices);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const price = await priceRepository.findBydId(+req.params.id);
      if (!price) {
        return res.status(400).send({
          message: "This price doesn't exist",
        });
      }
      return res.send(price);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const price = await priceRepository.findBydId(+req.params.id);
      if (!price) {
        return res.status(400).send({
          message: "This price doesn't exist",
        });
      }

      const updatePrice = await priceRepository.save(
        Object.assign(price, req.body),
      );
      return res
        .status(200)
        .send({ message: 'This price has been updated', updatePrice });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    const price = await priceRepository.findBydId(+req.params.id);
    try {
      if (!price) {
        return res.status(400).send({
          message: "This price doesn't exist",
        });
      }

      const deletePrice = await priceRepository.delete(price.id);
      if (deletePrice.affected === 1) {
        return res.status(200).send({
          message: 'This price with id= ' + price.id + ' has been deleted',
        });
      }
      return res.send(deletePrice);
    } catch (error) {
      return res.status(500).send({
        message: 'Could not delete price with id= ' + price.id,
      });
    }
  }
}

export default PriceController;
