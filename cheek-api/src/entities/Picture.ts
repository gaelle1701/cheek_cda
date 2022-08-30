import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ProductDetail } from './ProductDetail';

@Entity()
export class Picture extends BaseEntity {
  @Column({ unique: true })
  label: string;

  @Column({ unique: true })
  url: string;

  @OneToMany(() => ProductDetail, (attribute) => attribute.picture)
  attributes: ProductDetail[];
}
