import { EOrderStatus } from '../enums/order-status';
import { IOrderLine } from './order-line';
import { IUser } from './user';

export interface IOrder {
  id?: number;
  user: IUser['id'];
  orderLines: IOrderLine[];
  order_status?: EOrderStatus;
  reference?: string;
  created_at?: Date;
}

export type Orders = IOrder[];
