import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderLine } from './OrderLine';

export enum EOrderStatus {
  AVAILABLE = 'AVAILABLE',
  IN_DELIVERY = 'IN DELIVERY',
  DELIVERED = 'DELIVERED',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  reference: string;

  @Column('enum', { enum: EOrderStatus })
  order_status: EOrderStatus;

  @Column({ type: 'date' })
  created_at: Date;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  orderLines: OrderLine[];

  // created date & ref & status automatically
  @BeforeInsert()
  createOrder() {
    this.created_at = new Date();
    this.reference = uuidv4();
    this.order_status = EOrderStatus.AVAILABLE;
  }
}
