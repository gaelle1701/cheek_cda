import { IProduct } from '../../core/interfaces/product';

export interface CartItem {
  id: number;
  stock: number;
  price: number;
  size: string;
  product?: IProduct;
}

export interface ICart {
  items: CartItem[];
  total_ht: number;
  total_ttc: number;
  shippingFees: boolean;
}
