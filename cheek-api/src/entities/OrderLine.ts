import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';
import { BaseEntity } from './BaseEntity';

@Entity()
export class OrderLine extends BaseEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderLines)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderLines)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
