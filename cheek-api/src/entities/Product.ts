import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import slugify from 'slugify';

import { BaseEntity } from './BaseEntity';
import { Category } from './Category';
import { OrderLine } from './OrderLine';
import { Price } from './Price';
import { ProductDetail } from './ProductDetail';

@Entity()
export class Product extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  slug: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToOne(() => Price)
  @JoinColumn({ name: 'price_id' })
  price: Price;

  @OneToMany(() => ProductDetail, (attribute) => attribute.product)
  attributes: ProductDetail[];

  @OneToMany(() => OrderLine, (orderLine) => orderLine.product)
  orderLines: OrderLine[];

  // created slug compared to name automatically
  @BeforeInsert()
  @BeforeUpdate()
  slugifyProductName() {
    this.slug = slugify(this.name, {
      lower: true,
    });
  }
}
