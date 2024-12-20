import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { Users } from '../model/user-entity';
import { Products } from '../model/products-entity';
import { ProductCategory } from '../model/product_category-entity';
import { ProductImages } from '../model/product_images-entity';
import { Categories } from '../model/category-entity';
import { OTP } from '../model/otp-entity';

dotenv.config();
const env = process.env
export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.HOST_,
    port: parseInt(env.PORT_),
    username: env.USERNAME_,
    password: env.PASSWORD_,
    database: env.DATABASE_,
    synchronize: true,
    entities: [Users, Products, ProductCategory, ProductImages, Categories, OTP],
    migrations: [],
    subscribers: [],
})