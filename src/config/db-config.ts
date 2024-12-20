import { DataSource } from "typeorm";
import { Users } from '../model/user-entity';
import { Products } from '../model/products-entity';
import { ProductCategory } from '../model/product_category-entity';
import { ProductImages } from '../model/product_images-entity';
import { Categories } from '../model/category-entity';
import { OTP } from '../model/otp-entity';
import { ENV_DATABASE, ENV_HOST, ENV_PASSWORD, ENV_PORT, ENV_USERNAME } from "../utils/env-utils";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: ENV_HOST,
    port: parseInt(ENV_PORT),
    username: ENV_USERNAME,
    password: ENV_PASSWORD,
    database: ENV_DATABASE,
    synchronize: true,
    entities: [Users, Products, ProductCategory, ProductImages, Categories, OTP],
    migrations: [],
    subscribers: [],
})