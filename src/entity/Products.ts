
//table products in database.

import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Products{
    @PrimaryGeneratedColumn()
    readonly id : number;
    @Column()
    price : number;
    @Column({type: 'varchar'})
    name : string;
    @Column({type:'varchar'})
    author :string;
    @Column({ type: "varchar" })
     avatar: string;
}