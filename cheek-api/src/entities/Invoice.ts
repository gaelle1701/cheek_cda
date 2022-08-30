import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BeforeInsert,
  JoinColumn,
} from 'typeorm';
import { Order } from './Order';

export enum EPaymentMode {
  DIRECT_DEBIT = 'DIRECT_DEBIT',
  PAYPAL = 'PAYPAL',
}

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: EPaymentMode })
  payment_mode: EPaymentMode;

  @Column({ type: 'date' })
  created_at: Date;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // created date & mode automatically
  @BeforeInsert()
  createInvoice() {
    this.created_at = new Date();
    this.payment_mode = EPaymentMode.DIRECT_DEBIT;
  }
}
