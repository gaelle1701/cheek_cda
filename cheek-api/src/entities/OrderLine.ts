import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', select: false })
  created_at: Date;
  
  @Column({type: 'int'})
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderLines)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderLines)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
