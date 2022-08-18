import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";


@Entity()
export class Address extends BaseEntity{

    @Column({nullable: false})
    number: number;

    @Column({nullable: false})
    street: string;

    @Column({nullable: false})
    city: string;

    @Column({nullable: false})
    zip_code: number;

}

