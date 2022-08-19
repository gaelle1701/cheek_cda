import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderLine {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    quantity: number;

    @Column({type: 'date'})
    created_at: Date;

    @ManyToOne(() => Product, product => product.orderLines)
    @JoinColumn({name: "product_id"})
        product: Product;

    @ManyToOne(() => Order, order => order.orderLines)
    @JoinColumn({name: "order_id"})
        order: Order;

    // created date automatically
    @BeforeInsert() 
    createOrderLine() {
        this.created_at = new Date();
    }

}
