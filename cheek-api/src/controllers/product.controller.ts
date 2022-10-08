import { Request, Response } from 'express';
import { productRepository } from '../repository/product.repository';

class ProductController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      const savedProduct = await productRepository.createProduct(req.body);
      return res.send(savedProduct);
    } catch (error) {
      console.log(error);
      
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getProducts(req: Request, res: Response) {
    try {

      let getProducts = null

      if(req.query.slug) {
        getProducts = await productRepository.findOne( {
          where: {
            slug: req.query.slug as string
          },
          relations: [
            'category',
            'details',
            'details.size',
            'details.pictures'
          ],
        });
      } else {
          getProducts = await productRepository.find( {
            relations: [
              'category',
              'details',
              'details.size',
              'details.pictures'
            ],
          }
           
          )
        }
      
      return res.send(getProducts);

    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const product = await productRepository.findBydId(+req.params.id);
      if (!product) {
        return res.status(400).send({
          message: "This product doesn't exist",
        });
      }
      return res.send(product);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const product = await productRepository.findBydId(+req.params.id);
      if (!product) {
        return res.status(400).send({
          message: "This product doesn't exist !",
        });
      }

      const updateProduct = await productRepository.save(
        Object.assign(product, req.body),
      );
      if (updateProduct.affected === 1) {
        return res.status(200).send({
          message: 'The product with id= ' + product.id + ' has been updated !',
        });
      }

      return res.send(updateProduct);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    const productDetail = await productRepository.findBydId(+req.params.id);
    try {
      if (!productDetail) {
        return res.status(400).send({
          message: "This product doesn't exist",
        });
      }

      const deleteAddress = await productRepository.delete(productDetail.id);
      if (deleteAddress.affected === 1) {
        return res.status(200).send({
          message: `The product with id=${productDetail.id} has been deleted successfully !`,
        });
      }

      return res.send(deleteAddress);
    } catch (error) {
      return res.status(500).send({
        message: `Could not delete product with id=${productDetail.id}`,
      });
    }
  }
}

export default ProductController;
