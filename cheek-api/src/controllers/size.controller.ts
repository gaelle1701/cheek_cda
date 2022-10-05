import { Request, Response } from 'express';
import { sizeRepository } from '../repository/size.repository';

class SizeController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }
      const createSize = await sizeRepository.createSize(req.body);
      return res.send(createSize);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getSizes(req: Request, res: Response) {
    try {
      const getSizes = await sizeRepository.find({ relations: ["details"] });
      return res.send(getSizes);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const size = await sizeRepository.findBydId(+req.params.id);
      if (!size) {
        return res.status(400).send({
          message: "This size doesn't exist",
        });
      }
      return res.send(size);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const size = await sizeRepository.findBydId(+req.params.id);
      if (!size) {
        return res.status(400).send({
          message: "This size doesn't exist",
        });
      }

      const updateSize = await sizeRepository.save(
        Object.assign(size, req.body),
      );
      if (updateSize.affected === 1) {
        return res.status(200).send({
          message: 'This size with id= ' + size.id + ' has been updated',
        });
      }
      return res.send(updateSize);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    const size = await sizeRepository.findBydId(+req.params.id);
    try {
      if (!size) {
        return res.status(400).send({
          message: "This size doesn't exist",
        });
      }

      const deleteSize = await sizeRepository.delete(size.id);
      if (deleteSize.affected === 1) {
        return res.status(200).send({
          message: 'This size with id= ' + size.id + ' has been deleted',
        });
      }

      return res.send(deleteSize);
    } catch (error) {
      return res.status(500).send({
        message: 'Could not delete size with id= ' + size.id,
      });
    }
  }
}

export default SizeController;
