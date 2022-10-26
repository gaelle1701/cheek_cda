import { INITIAL_CART } from '../helpers/cart';

async function cartMiddleware(req, res, next) {
  if (!req.session.cart) {
    req.session.cart = INITIAL_CART;
  }

  next();
}

export default cartMiddleware;
