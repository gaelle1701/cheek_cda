import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Price extends BaseEntity {
  @Column({ type: 'float' })
  price_ht: number;

  @Column({ type: 'float' })
  price_ttc: number;

  // calculed price_ttc automatically
  @BeforeInsert()
  @BeforeUpdate()
  createPrice() {
    this.price_ttc = this.price_ht + this.price_ht * 0.2;
  }
}
