import { NextFunction, Request, Response } from 'express';
import { INITIAL_CART } from '../helpers/cart';

const cartMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.cart) {
    req.session.cart = INITIAL_CART;
  }

  next();
};

export default cartMiddleware;
