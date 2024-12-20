import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product_category-entity";
import { Products } from "./products-entity";


@Entity()
export class ProductImages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Products, (p) => p.images)
    product: Products

    @CreateDateColumn()
    createdAt: Date;
}