import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ProductDetail } from './ProductDetail';

@Entity()
export class Price extends BaseEntity {
  @Column({ type: 'float' })
  price_ht: number;

  @Column({ type: 'float' })
  price_ttc: number;

  @OneToMany(() => ProductDetail, (attribute) => attribute.price)
  attributes: ProductDetail[];

  // calculated price_ttc automatically
  @BeforeInsert()
  @BeforeUpdate()
  createPrice() {
    this.price_ttc = this.price_ht + this.price_ht * 0.2;
  }
}
