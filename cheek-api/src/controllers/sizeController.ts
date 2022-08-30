import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Size } from '../entities/Size';

class SizeController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        res.status(400).send({
          message: 'Content can not be empty!',
        });
        return;
      }
      // get connection instance to db in app.ts
      const sizeRepository = AppDataSource.getRepository(Size);
      const createSize = sizeRepository.create(req.body);
      const saveSize = await sizeRepository.save(createSize);
      return res.send(saveSize);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getSizes(req: Request, res: Response) {
    try {
      // get connection instance to db in app.ts
      const sizeRepository = AppDataSource.getRepository(Size);
      const getSizes = await sizeRepository.find();

      return res.send(getSizes);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const sizeRepository = AppDataSource.getRepository(Size);
      const getById = await sizeRepository.findOneBy({
        id: parseInt(req.params.id, 10),
      });
      if (!getById) {
        return res.status(400).send({
          message: "This size doesn't exist",
        });
      }
      return res.send(getById);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const sizeId = req.params.id;

      const sizeRepository = AppDataSource.getRepository(Size);
      const updateSize = await sizeRepository.update(sizeId, req.body);

      if (updateSize.affected === 1) {
        return res.status(200).send({
          message: 'This size with id= ' + sizeId + ' has been updated',
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
    const sizeId = req.params.id;

    try {
      if (!sizeId) {
        return res.status(400).send({
          message: "This size doesn't exist",
        });
      }

      const sizeRepository = AppDataSource.getRepository(Size);
      const deleteSize = await sizeRepository.delete(sizeId);

      if (deleteSize.affected === 1) {
        return res.status(200).send({
          message: 'This size with id= ' + sizeId + ' has been deleted',
        });
      }

      return res.send(deleteSize);
    } catch (error) {
      return res.status(500).send({
        message: 'Could not delete Size with id= ' + sizeId,
      });
    }
  }
}

export default new SizeController();
