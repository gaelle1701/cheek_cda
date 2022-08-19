import { BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from "typeorm";


export abstract class BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date', select: false})
    created_at: Date;

    @Column({ type: 'date', nullable: true, select: false})
    updated_at: Date | null;

    // created date automatically
    @BeforeInsert() 
    createDate() {
        this.created_at = new Date();
    }
    
    // updated date automatically
    @BeforeUpdate()
    updateDate() {
        this.updated_at = new Date();
    }
}