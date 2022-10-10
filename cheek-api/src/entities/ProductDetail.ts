import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';
import { Size } from './Size';

@Entity()
export class ProductDetail extends BaseEntity {
  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'float' })
  price_ht: number;

  @Column({ type: 'float' })
  price_ttc: number;

  @ManyToOne(() => Product, (product) => product.details)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Size, (size) => size.details)
  @JoinColumn({ name: 'size_id' })
  size: Size;


   // calculated price_ttc automatically
  @BeforeInsert()
  @BeforeUpdate()
  createPrice() {
    this.price_ttc = this.price_ht + this.price_ht * 0.2;
  }
}



