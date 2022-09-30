import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ProductDetail } from './ProductDetail';

@Entity()
export class Picture extends BaseEntity {
  @Column({ unique: true })
  label: string;

  @Column({ unique: true })
  url: string;


  // @OneToMany(() => ProductDetail, (detail) => detail.picture)
  // details: ProductDetail[];
  @ManyToOne(() => Picture, (picture) => picture.productDetail)
  @JoinColumn({ name: 'productDetail_id' })
  productDetail: ProductDetail;
}
