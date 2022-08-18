import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ProductAttribute } from "./ProductAttribute";

@Entity()
export class Stock extends BaseEntity {

    @Column()
    count: number;

    @OneToMany(() => ProductAttribute, (attribute) => attribute.stock)
    attributes: ProductAttribute[];
}