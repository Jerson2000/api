import { Column, CreateDateColumn, Decimal128, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductCategory } from "./product_category-entity";
import { ProductImages } from "./product_images-entity";


@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    description: string;

    @Column({
        default: 0
    })
    quantity: number

    @Column({
        type: "decimal"
    })
    price: number

    @OneToMany(() => ProductCategory, (cat) => cat.product, { eager: true }) // product -> productCategory
    categories: ProductCategory[] | null

    @OneToMany(() => ProductImages, (img) => img.product, { eager: true })
    images: ProductImages[] | null

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedDate: Date
}