import * as bcrypt from 'bcrypt';
import {
  Entity,
  Column,
  BeforeInsert,
  OneToOne,
  ManyToOne,
  JoinColumn,
  BeforeUpdate,
} from 'typeorm';
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

  // @Column({nullable: true, unique: true})
  // unique_string: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  //use bcrypt to hashed password for security
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
  }

  // created status automatically
  @BeforeInsert()
  createUser() {
    this.account_status = EAccountStatus.PENDING;
  }
}
