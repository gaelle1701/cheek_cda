import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import slugify from 'slugify';

import { BaseEntity } from './BaseEntity';
import { Category } from './Category';
import { OrderLine } from './OrderLine';
import { ProductDetail } from './ProductDetail';
import { Picture } from './Picture';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: "varchar", length: 45, unique: true })
  name: string;

  @Column({ type: "varchar", length: 255})
  description: string;

  @Column({ type: "varchar", length: 45})
  slug: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ProductDetail, (detail) => detail.product, {
    cascade: true,
  })
  details: ProductDetail[];

  @OneToMany(() => Picture, (picture) => picture.product, {
    cascade: true,
  })
  pictures: Picture[];

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



