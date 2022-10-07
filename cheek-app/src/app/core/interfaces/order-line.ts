import { IOrder } from './order';
import { IProduct } from './product';

export interface IOrderLine {
  quantity: number;
  order: IOrder;
  product: IProduct;
}

export type OrderLines = IOrderLine[];
