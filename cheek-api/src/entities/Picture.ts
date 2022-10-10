import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity()
export class Picture extends BaseEntity {
  @Column({ type: "varchar", length:45, unique: true })
  label: string;

  @Column({ type: "varchar", length: 255, unique: true })
  url: string;

  @Column({ unique: true })
  path: string;

  @ManyToOne(() => Product, (product) => product.pictures, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}


