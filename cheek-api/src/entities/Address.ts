import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity';

@Entity()
export class Address extends BaseEntity {
  @Column({type: "varchar", length:45})
  number: string;

  @Column({type: "varchar", length: 45})
  street: string;

  @Column({type: "varchar", length: 45})
  city: string;

  @Column({type: "int"})
  zip_code: number;

}
