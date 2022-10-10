import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderLine } from './OrderLine';
import { User } from './User';

export enum EOrderStatus {
  AVAILABLE = 'AVAILABLE',
  IN_DELIVERY = 'IN DELIVERY',
  DELIVERED = 'DELIVERED',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', select: false })
  created_at: Date;
  
  @Column({ type: 'uuid', unique: true })
  reference: string;

  @Column('enum', { enum: EOrderStatus })
  order_status: EOrderStatus;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  orderLines: OrderLine[];

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // created date & ref & status automatically
  @BeforeInsert()
  createOrder() {
    this.reference = uuidv4();
    this.order_status = EOrderStatus.AVAILABLE;
  }
}
