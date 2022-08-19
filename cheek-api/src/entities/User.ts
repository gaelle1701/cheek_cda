import * as bcrypt from "bcrypt"
import { Entity, Column, BeforeInsert, OneToOne, ManyToOne, JoinColumn } from "typeorm"
import { Address } from "./Address"
import { BaseEntity } from "./BaseEntity"
import { Role } from "./Role"

export enum EAccountStatus {
    PENDING = 'PENDING',
    VALID = 'VALID'
}

@Entity()
export class User extends BaseEntity{

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({unique: true})
    phone: string

    @Column({unique: true})
    email: string

    @Column({unique: true})
    password: string

    @Column('enum', {enum: EAccountStatus, nullable: false})
    account_status: EAccountStatus;

    // @Column({nullable: true, unique: true})
    // unique_string: string;


    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({name: "role_id"})
        role: Role;

    @OneToOne(() => Address)
    @JoinColumn({name: "address_id"})
    addresse: Address;

    //use bcrypt to hashed password for security
    @BeforeInsert()
    async hashPassword() {
        if(this.password) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword
        }
    }

    // created status automatically
    @BeforeInsert() 
    createUser() {
        this.account_status = EAccountStatus.PENDING;
    }

}
