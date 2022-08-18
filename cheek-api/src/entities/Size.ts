import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ProductAttribute } from "./ProductAttribute";

@Entity()
export class Size extends BaseEntity {

    @Column({nullable: false, unique: true})
    label: string;

    @OneToMany(() => ProductAttribute, (attribute) => attribute.size)
    attributes: ProductAttribute[];

}