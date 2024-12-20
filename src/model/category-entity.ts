import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product_category-entity";


@Entity()
export class Categories {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ProductCategory, (cat) => cat.category)
    product_category: ProductCategory[] | null

    @CreateDateColumn()
    createdAt: Date;
}