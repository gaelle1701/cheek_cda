import { Request, Response } from 'express';
import Cart from '../helpers/cart';

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
          id: parseInt(req.body.id),
          price: req.body.price,
          quantity: parseInt(req.body.quantity, 10),
        },
        req.session.cart,
      );

      res.send({ msg: 'ok', cart: req.session.cart });
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  }

  async getCart(req: Request, res: Response) {
    if (!req.session.cart.items.length) {
      return res.send({ cart: req.session.cart });
    }

    res.send({ cart: req.session.cart });
  }

  async edit(req: Request, res: Response) {
    try {
      Cart.updateProductToCart(
        parseInt(req.params.id, 10),
        parseInt(req.body.quantity, 10),
        req.session.cart,
      );

      res.send({ msg: 'ok', cart: req.session.cart });
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      Cart.deleteProductToCart(parseInt(req.params.id, 10), req.session.cart);
      res.send({ msg: 'ok', cart: req.session.cart });
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
