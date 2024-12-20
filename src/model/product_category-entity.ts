import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./category-entity";
import { Products } from "./products-entity";


@Entity()
export class ProductCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Categories, (cat) => cat.product_category, { eager: true })
    category: Categories

    @ManyToOne(() => Products, (p) => p.categories)
    product: Products


    @CreateDateColumn()
    createdAt: Date;
}