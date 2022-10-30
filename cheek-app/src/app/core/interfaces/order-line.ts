import { IOrder } from './order';
import { IProduct } from './product';

export interface IOrderLine {
  quantity: number;
  order: IOrder;
  product: IProduct;
  price: number;
}

export type OrderLines = IOrderLine[];
