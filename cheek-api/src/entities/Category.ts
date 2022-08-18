import { Entity, Column, OneToMany } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";

@Entity()
export class Category extends BaseEntity{

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    slug: string;

    @OneToMany(() => Product, product =>  product.category)
    products: Product[];

}