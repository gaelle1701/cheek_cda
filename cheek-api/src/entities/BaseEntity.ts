import { Column, PrimaryGeneratedColumn } from "typeorm";


export abstract class BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date', nullable: false, select: false})
    created_at: Date;

    @Column({ type: 'date', select: false})
    updated_at: Date | null;

    // created date automatically
    // @BeforeInsert() 
    // createCategory() {
    //     this.created_at = new Date();
    // }
    
    // updated date automatically
    // @BeforeUpdate()
    // updateCategory() {
    //     this.updated_at = new Date();
    // }
}