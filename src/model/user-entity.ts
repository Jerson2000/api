import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ROLE } from "./types";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        nullable: true
    })
    age: number;

    @Column({
        nullable: true
    })
    gender: string;

    @Column({
        nullable: true
    })
    address: string;

    @Column()
    email: string;

    @Column({
        type: "enum",
        enum: ROLE,
        default: ROLE.USER,
    })
    role: ROLE

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedDate: Date
}