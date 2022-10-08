import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import slugify from 'slugify';

import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: "varchar", length: 45})
  name: string;

  @Column({ type: "varchar", length: 45, unique: true })
  slug: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @BeforeInsert()
  @BeforeUpdate()
  slugifyCategoryName() {
    this.slug = slugify(this.name, {
      lower: true,
    });
  }
}
