import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Picture } from "./Picture";
import { Product } from "./Product";
import { Size } from "./Size";
import { Stock } from "./Stock";

@Entity()
export class ProductAttribute extends BaseEntity {

    @ManyToOne(() => Product, product => product.attributes)
    @JoinColumn({name: "product_id"})
        product: Product;

    @ManyToOne(() => Size, size => size.attributes)
    @JoinColumn({name: "size_id"})
        size: Size;

    @ManyToOne(() => Stock, stock => stock.attributes)
    @JoinColumn({name: "stock_id"})
        stock: Stock;

    @ManyToOne(() => Picture, picture => picture.attributes)
    @JoinColumn({name: "picture_id"})
        picture: Picture;

}