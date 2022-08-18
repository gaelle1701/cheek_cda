import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export enum ERole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER'
}

@Entity()
export class Role extends BaseEntity{

    @Column('enum', {enum: ERole, nullable: false})
    role: ERole;
    
    @OneToMany(() => User, (user) => user.role)
    users: User[];

}