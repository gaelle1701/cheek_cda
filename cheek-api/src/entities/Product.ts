import { Entity, Column, BeforeInsert, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";
import { OrderLine } from "./OrderLine";
import { Price } from "./Price";
import { ProductAttribute } from "./ProductAttribute";


@Entity()
export class Product extends BaseEntity {
    
    @Column({unique: true})
    name: string;

    @Column({type: "text"})
    description: string;

    @Column()
    slug: string;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({name: "category_id"})
    category: Category;
    
    @OneToOne(() => Price)
    @JoinColumn({name: "price_id"})
    price: Price; 

    @OneToMany(() => ProductAttribute, (attribute) => attribute.product)
    attributes: ProductAttribute[];

    @OneToMany(() => OrderLine, (orderLine) => orderLine.product)
    orderLines: OrderLine[];



//  // created slug compared to name automatically
//     @BeforeInsert()
//     createProduct() {
//         this.slug = slugify(this.name, {
//             lower: true
//         })
//     }

}   