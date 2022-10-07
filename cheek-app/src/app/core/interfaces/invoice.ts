import { EPaymentMode } from '../enums/payment-methode';
import { IOrder } from './order';

export interface IInvoice {
  payment_mode: EPaymentMode;
  order: IOrder;
}

export type Invoices = IInvoice[];
