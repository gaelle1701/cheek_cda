import { EOrderStatus } from '../enums/order-status';
import { IOrderLine } from './order-line';

export interface IOrder {
  reference: string;
  order_status: EOrderStatus;
  orderLine: IOrderLine[];
}

export type Orders = IOrder[];
