import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ProductDetail } from './ProductDetail';

@Entity({
  orderBy: {
    id: "ASC",
  }
})
export class Size extends BaseEntity {
  @Column({ type: "varchar", length: 45, unique: true })
  label: string;

  @OneToMany(() => ProductDetail, (detail) => detail.size)
  details: ProductDetail[];
}
