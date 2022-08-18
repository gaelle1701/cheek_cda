import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BeforeInsert } from "typeorm";
import { Order } from "./Order";

export enum EPaymentMode{
    DIRECT_DEBIT = "DIRECT_DEBIT",
    PAYPAL = "PAYPAL"
}

@Entity()
export class Invoice {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('enum', {enum: EPaymentMode, nullable: false})
    payment_mode: EPaymentMode;

    @Column({type: 'date', nullable: false})
    created_at: Date;

    @OneToOne(() => Order)
    order: Order;

    // created date & mode automatically
    @BeforeInsert() 
    createInvoice() {
        this.created_at = new Date();
        this.payment_mode = EPaymentMode.DIRECT_DEBIT;
    }

}