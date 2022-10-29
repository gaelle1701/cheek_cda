import { Cart } from '../../helpers/cart';

declare module 'express-session' {
  interface SessionData {
    cart: Cart;
  }
}
