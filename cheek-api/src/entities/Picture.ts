import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ProductDetail } from './ProductDetail';

@Entity()
export class Picture extends BaseEntity {
  @Column({ type: "varchar", length:45, unique: true })
  label: string;

  @Column({ type: "varchar", length: 255, unique: true })
  url: string;


  // @OneToMany(() => ProductDetail, (detail) => detail.picture)
  // details: ProductDetail[];
  @ManyToOne(() => Picture, (picture) => picture.productDetail)
  @JoinColumn({ name: 'productDetail_id' })
  productDetail: ProductDetail;
}
