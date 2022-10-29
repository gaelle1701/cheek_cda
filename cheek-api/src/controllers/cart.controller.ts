import { Request, Response } from 'express';
import Cart from '../helpers/cart';
import { productRepository } from '../repository/product.repository';

class CartController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      Cart.addProductToCart(
        {
          productId: parseInt(req.body.productId, 10),
          priceHt: parseFloat(req.body.priceHt),
          stock: parseInt(req.body.stock, 10),
          size: parseInt(req.body.size, 10),
        },
        req.session.cart,
      );

      res.send({ msg: 'ok' });
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  }

  async getCart(req: Request, res: Response) {
    // aggregate product for each item
    const items = await Promise.all(
      req.session.cart.items.map(async (item) => {
        const product = await productRepository.findBydId(item.productId);
        const size = product.details?.find(
          (detail) => detail.size.id === item.size,
        ).size;

        return {
          ...item,
          size,
          product,
        };
      }),
    );

    const cart = {
      ...req.session.cart,
      items,
    };
    res.send({ cart });
  }

  async edit(req: Request, res: Response) {
    try {
      Cart.updateProductToCart(
        parseInt(req.params.productId, 10),
        parseInt(req.body.stock, 10),
        req.body.size,
        req.session.cart,
      );

      res.send({ msg: 'ok' });
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      Cart.deleteProductToCart(
        parseInt(req.params.id, 10),
        parseInt(req.body.sizeId),
        req.session.cart,
      );
      res.send({ msg: 'ok' });
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  }

  async resetCart(req: Request, res: Response) {
    try {
      Cart.resetCart(req.session.cart);
      res.send({ msg: 'ok' });
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  }
}

export default CartController;
