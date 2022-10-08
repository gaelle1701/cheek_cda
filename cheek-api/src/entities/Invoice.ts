import { Entity, Column, OneToOne, BeforeInsert, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';

export enum EPaymentMode {
  DIRECT_DEBIT = 'DIRECT_DEBIT',
  PAYPAL = 'PAYPAL',
}

@Entity()
export class Invoice{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', select: false })
  created_at: Date;
  
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
