import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Price extends BaseEntity {
    
    @Column({type: "float", nullable: false})
    price_ht: number;

    @Column({type: "float", nullable: false})
    price_ttc: number;

    // calculed price_ttc automatically
    @BeforeInsert()
    createPrice() {
        this.price_ttc = this.price_ht + this.price_ht*0.20
    }
}