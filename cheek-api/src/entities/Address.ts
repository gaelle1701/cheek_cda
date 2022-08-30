import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity()
export class Address extends BaseEntity {
  @Column()
  number: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  zip_code: number;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
