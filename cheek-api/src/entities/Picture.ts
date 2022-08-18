import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ProductAttribute } from "./ProductAttribute";


@Entity()
export class Picture extends BaseEntity {

    @Column({unique: true})
    label: string

    @Column({type: "text", unique: true})
    url: string

    @OneToMany(() => ProductAttribute, (attribute) => attribute.picture)
    attributes: ProductAttribute[];

}