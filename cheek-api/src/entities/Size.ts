import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ProductDetail } from './ProductDetail';

@Entity()
export class Size extends BaseEntity {
  @Column({ unique: true })
  label: string;

  @OneToMany(() => ProductDetail, (detail) => detail.size)
  details: ProductDetail[];
}
