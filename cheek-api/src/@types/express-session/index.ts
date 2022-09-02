import { ICart } from '../../helpers/cart';

declare module 'express-session' {
  interface SessionData {
    cart: ICart;
  }
}
