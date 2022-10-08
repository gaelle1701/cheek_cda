import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Address } from './Address';
import { BaseEntity } from './BaseEntity';
import { Order } from './Order';

export enum ERole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export enum EAccountStatus {
  PENDING = 'PENDING',
  VALID = 'VALID',
}

@Entity()
export class User extends BaseEntity {
  @Column('enum', { enum: ERole, default: ERole.CUSTOMER, nullable: false })
  role: ERole;

  @Column({ type: "varchar", length: 45, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 45, nullable: false })
  lastName: string;

  @Column({ type: "varchar", length:45, unique: true, nullable: true})
  phone: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email: string;

  @Column({ type: "varchar", length: 150, unique: true })
  password: string;

  @Column({ nullable: true, unique: true })
  token: string;

  @Column('enum', { enum: EAccountStatus, default: EAccountStatus.PENDING })
  account_status: EAccountStatus;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
  



  // created status automatically
  @BeforeInsert()
  async createUser() {
    this.account_status = EAccountStatus.PENDING;

    if (this.password) {
      //use bcrypt to hashed password for security
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
