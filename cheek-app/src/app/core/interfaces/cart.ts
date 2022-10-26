import { IProduct } from './product';

export interface CartItem {
  productId: number;
  stock: number;
  priceHt: number;
  size: number;
  product?: IProduct;
}

export interface ICart {
  items: CartItem[];
  totalHt: number;
  totalTtc: number;
  shippingFees: boolean;
}

export interface CartResponse {
  cart: ICart;
}

export interface CartCheckout {
  items: any;
}
