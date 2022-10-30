import { Request, Response } from 'express';
import logger from '../config/winston';
import { productDetailRepository } from '../repository/product-detail.repository';

class ProductDetailController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(404).send({
          message: 'Content can not be empty!',
        });
      }
      logger.info(req.body)
      const savedProductDetail =
        await productDetailRepository.createProductDetail(req.body);
      return res.status(201).send({
        savedProductDetail,
        message: 'This detail was succefully created !'
      });
    } catch (error) {
      logger.error('Error in productdetail create!', error);
      
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getProductDetails(req: Request, res: Response) {
    try {
      const getProductDetails = await productDetailRepository.find({
        relations: ["product", "size"]
      });
      return res.status(200).send(getProductDetails);
    } catch (error) {
      console.log(error);
      
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const productDetail = await productDetailRepository.findById(
        +req.params.id,
      );
      if (!productDetail) {
        return res.status(404).send({
          message: "This product detail doesn't exist",
        });
      }
      return res.status(200).send(productDetail);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const productDetail = await productDetailRepository.findById(
        +req.params.id,
      );
      if (!productDetail) {
        return res.status(404).send({
          message: "This product detail doesn't exist !",
        });
      }

      const updateProductDetail = await productDetailRepository.save(
        Object.assign(productDetail, req.body),
      );
      if (updateProductDetail.affected === 1) {
        return res.status(200).send({
          message:
            'The product detail with id= ' +
            productDetail.id +
            ' has been updated !',
            ...updateProductDetail
        });
      }

      return res.send(updateProductDetail);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    const productDetail = await productDetailRepository.findById(
      +req.params.id,
    );
    try {
      if (!productDetail) {
        return res.status(404).send({
          message: "This product detail doesn't exist",
        });
      }

      const deleteDetails = await productDetailRepository.delete(
        productDetail.id,
      );
      if (deleteDetails.affected === 1) {
        return res.status(204).send({
          message: `The product detail with id=${productDetail.id} has been deleted successfully !`
        });
      }

      return res.send(deleteDetails);
    } catch (error) {
      return res.status(500).send({
        message: `Could not delete product detail with id=${productDetail.id}`,
      });
    }
  }
}

export default ProductDetailController;
