import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Address } from './Address';
import { BaseEntity } from './BaseEntity';

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

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  password: string;

  @Column('enum', { enum: EAccountStatus, default: EAccountStatus.PENDING })
  account_status: EAccountStatus;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

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
