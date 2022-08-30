import { Request, Response } from 'express';
import { productDetailRepository } from '../repository/product-detail.repository';

class ProductDetailController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      const savedProductDetail =
        await productDetailRepository.createProductDetail(req.body);
      return res.send(savedProductDetail);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getProductDetails(req: Request, res: Response) {
    try {
      const getProductDetails = await productDetailRepository.find();
      return res.send(getProductDetails);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const productDetail = await productDetailRepository.findBydId(
        +req.params.id,
      );
      if (!productDetail) {
        return res.status(400).send({
          message: "This addresse doesn't exist",
        });
      }
      return res.send(productDetail);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const productDetail = await productDetailRepository.findBydId(
        +req.params.id,
      );
      if (!productDetail) {
        return res.status(400).send({
          message: "This productDetailRepository doesn't exist !",
        });
      }

      const updateProductDetail = await productDetailRepository.save(
        Object.assign(productDetail, req.body),
      );
      if (updateProductDetail.affected === 1) {
        return res.status(200).send({
          message:
            'The productDetail with id= ' +
            productDetail.id +
            ' has been updated !',
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
    const productDetail = await productDetailRepository.findBydId(
      +req.params.id,
    );
    try {
      if (!productDetail) {
        return res.status(400).send({
          message: "This productDetail doesn't exist",
        });
      }

      const deleteAddress = await productDetailRepository.delete(
        productDetail.id,
      );
      if (deleteAddress.affected === 1) {
        return res.status(200).send({
          message: `The address with id=${productDetail.id} has been deleted successfully !`,
        });
      }

      return res.send(deleteAddress);
    } catch (error) {
      return res.status(500).send({
        message: `Could not delete address with id=${productDetail.id}`,
      });
    }
  }
}

export default ProductDetailController;
