import { Request, Response } from 'express';
import { pictureRepository } from '../repository/picture.repository';

class PictureController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      const savePicture = await pictureRepository.createPicture(req.body);
      return res.send(savePicture);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getPictures(req: Request, res: Response) {
    try {
      const getPictures = await pictureRepository.find();
      return res.send(getPictures);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const picture = await pictureRepository.findBydId(+req.params.id);
      if (!picture) {
        return res.status(400).send({
          message: "This picture doesn't exist",
        });
      }
      return res.send(picture);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const picture = await pictureRepository.findBydId(+req.params.id);
      if (!picture) {
        return res.status(400).send({
          message: "This picture doesn't exist !",
        });
      }

      const updatePicture = await pictureRepository.save(
        Object.assign(picture, req.body),
      );
      if (updatePicture.affected === 1) {
        return res.status(200).send({
          message: 'The picture with id= ' + picture.id + ' has been updated !',
        });
      }

      return res.send(updatePicture);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    const picture = await pictureRepository.findBydId(+req.params.id);
    try {
      if (!picture) {
        return res.status(400).send({
          message: "This picture doesn't exist",
        });
      }

      const deleteAddress = await pictureRepository.delete(picture.id);
      if (deleteAddress.affected === 1) {
        return res.status(200).send({
          message: `The picture with id=${picture.id} has been deleted successfully !`,
        });
      }

      return res.send(deleteAddress);
    } catch (error) {
      return res.status(500).send({
        message: `Could not delete picture with id=${picture.id}`,
      });
    }
  }
}

export default PictureController;
