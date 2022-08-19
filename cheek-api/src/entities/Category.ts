import { Entity, Column, OneToMany } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";

@Entity()
export class Category extends BaseEntity{

    @Column({length: 45})
    name: string;

    @Column({length: 45, unique: true})
    slug: string;

    @OneToMany(() => Product, product =>  product.category)
    products: Product[];

}