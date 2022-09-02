import { Entity, Column, OneToOne, BeforeInsert, JoinColumn } from 'typeorm';
import { Order } from './Order';
import { BaseEntity } from './BaseEntity';

export enum EPaymentMode {
  DIRECT_DEBIT = 'DIRECT_DEBIT',
  PAYPAL = 'PAYPAL',
}

@Entity()
export class Invoice extends BaseEntity {
  @Column('enum', { enum: EPaymentMode })
  payment_mode: EPaymentMode;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // created date & mode automatically
  @BeforeInsert()
  createInvoice() {
    this.payment_mode = EPaymentMode.DIRECT_DEBIT;
  }
}
