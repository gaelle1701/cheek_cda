import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderLine } from './OrderLine';
import { BaseEntity } from './BaseEntity';

export enum EOrderStatus {
  AVAILABLE = 'AVAILABLE',
  IN_DELIVERY = 'IN DELIVERY',
  DELIVERED = 'DELIVERED',
}

@Entity()
export class Order extends BaseEntity {
  @Column({ type: 'uuid', unique: true })
  reference: string;

  @Column('enum', { enum: EOrderStatus })
  order_status: EOrderStatus;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  orderLines: OrderLine[];

  // created date & ref & status automatically
  @BeforeInsert()
  createOrder() {
    this.reference = uuidv4();
    this.order_status = EOrderStatus.AVAILABLE;
  }
}
