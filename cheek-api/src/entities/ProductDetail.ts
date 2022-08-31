import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Picture } from './Picture';
import { Product } from './Product';
import { Size } from './Size';
import { Price } from './Price';

@Entity()
export class ProductDetail extends BaseEntity {
  @Column({ type: 'int' })
  stock: number;

  @ManyToOne(() => Product, (product) => product.attributes)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Size, (size) => size.attributes)
  @JoinColumn({ name: 'size_id' })
  size: Size;

  @ManyToOne(() => Picture, (picture) => picture.attributes)
  @JoinColumn({ name: 'picture_id' })
  picture: Picture;

  @ManyToOne(() => Price, (price) => price.attributes)
  @JoinColumn({ name: 'price_id' })
  price: Picture;
}
