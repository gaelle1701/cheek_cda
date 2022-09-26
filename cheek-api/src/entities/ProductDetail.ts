import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Picture } from './Picture';
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

  // @ManyToOne(() => Picture, (picture) => picture.details)
  // @JoinColumn({ name: 'picture_id' })
  // picture: Picture;

  @OneToMany(() => Picture, (detail) => detail.picture)
   details: ProductDetail[];


   // calculated price_ttc automatically
  @BeforeInsert()
  @BeforeUpdate()
  createPrice() {
    this.price_ttc = this.price_ht + this.price_ht * 0.2;
  }
}



