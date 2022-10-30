import { Request, Response } from 'express';
import * as cloudinary from 'cloudinary';
import { pictureRepository } from '../repository/picture.repository';
import logger from '../config/winston';

class PictureController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(404).send({
          message: 'Content can not be empty!',
        });
      }
      if (req.file.path) {
        const uploadedPicture = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: 'cheek/products',
          },
        );
        
        if (uploadedPicture) {
          logger.info('Uploaded picture Source');
          const savedPicture = await pictureRepository.createPicture({
            url: uploadedPicture.secure_url,
            label: req.body.label,
            path: uploadedPicture.public_id,
            product: req.body.product_id,
          });
          logger.info('Saved picture Source');
          return res.status(201).send({
            savedPicture,
            message: 'This picture was succefully uploaded and created !'
          });
        }
      }
    } catch (error) {
      console.log(error);
      
      return res.status(500).send({
        message: error
      });
    }
  }

  async getPictures(req: Request, res: Response) {
    try {
      const getPictures = await pictureRepository.find();
      return res.status(200).send(getPictures);
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
        return res.status(404).send({
          message: "This picture doesn't exist",
        });
      }
      return res.status(200).send(picture);
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
        return res.status(404).send({
          message: "This picture doesn't exist !",
        });
      }
      if (req.file.path) {
        const deletedPicture = await cloudinary.v2.uploader.destroy(
          picture.path,
        );
        if (deletedPicture) {
          const uploadedPicture = await cloudinary.v2.uploader.upload(
            req.file.path,
            {
              folder: 'cheek/products',
            },
          );
          const updatedPicture = await pictureRepository.save(
            Object.assign(picture, {
              url: uploadedPicture.secure_url,
              path: uploadedPicture.public_id,
            }),
          );
          if (updatedPicture) {
            return res.status(200).send({
              message:
                'The picture with id= ' + picture.id + ' has been updated !',
                ...updatedPicture
            });
          }
          return res.send(updatedPicture);
        }
      }
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
        return res.status(404).send({
          message: "This picture doesn't exist",
        });
      }
      await cloudinary.v2.uploader.destroy(picture.path);
      const deletePicture = await pictureRepository.delete(picture.id);
      if (deletePicture.affected === 1) {
        return res.status(204).send({
          message: `The picture with id=${picture.id} has been deleted successfully !`,
        });
      }
      return res.send(deletePicture);
    } catch (error) {
      return res.status(500).send({
        message: `Could not delete picture with id=${picture.id}`,
      });
    }
  }
}

export default PictureController;
