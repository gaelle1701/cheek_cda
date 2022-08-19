import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";


@Entity()
export class Address extends BaseEntity{

    @Column()
    number: number;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    zip_code: number;

}

