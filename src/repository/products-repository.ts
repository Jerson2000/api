import { Repository } from "typeorm";
import { Products } from "../model/products-entity";
import { ProductImages } from "../model/product_images-entity";
import { ProductCategory } from "../model/product_category-entity";
import { AppDataSource } from "../config/db-config";
import { ICategory, IProductCategories, IProductImages, IProducts } from "../model/types";
import { BadRequestException, NotFoundException } from "../exceptions/http-exception";
import { encodeXText } from "nodemailer/lib/shared";



export class ProductRepository {
    private productRepo: Repository<Products>
    private imagesRepo: Repository<ProductImages>
    private categoriesRepo: Repository<ProductCategory>

    constructor() {
        this.productRepo = AppDataSource.getRepository(Products);
        this.imagesRepo = AppDataSource.getRepository(ProductImages);
        this.categoriesRepo = AppDataSource.getRepository(ProductCategory);
    }

    async addProduct(product: IProducts): Promise<IProducts> {
        const p = await this.productRepo.save(product);
        return p;
    }


    async updateProduct(productId: number, product: IProducts): Promise<IProducts> {
        const checkProduct = await this.productRepo.findOneBy({
            id: productId
        })
        if (!checkProduct) {
            throw new Error("Product not found!");
        }
        return await this.productRepo.save(product);
    }

    async productList(): Promise<IProducts[]> {
        const products = await this.productRepo.find();
        return products;
    }

    async getProduct(productId: number): Promise<IProducts> {
        const get = await this.productRepo.findOneBy({
            id: productId
        })
        if (!get) {
            throw new NotFoundException("Product not found!");
        }
        return get;
    }


    async addProductImages(productId: number, images: IProductImages[]): Promise<IProductImages[] | any> {

        if (!images && images.length === 0) {
            throw new BadRequestException("Provide the product images!");
        }

        const p = await this.productRepo.findOneBy({
            id: productId
        })

        if (!p) {
            throw new NotFoundException("Product not found!");
        }


        const updatedImagesFiles = images.map(image => ({
            ...image,
            product: p
        }));

        const pImages = await this.imagesRepo.save(updatedImagesFiles);
        return pImages;
    }

    async addProductCategory(productId: number, categories: ICategory[]): Promise<IProductCategories[]> {      
        const product = await this.productRepo.findOneBy({ id: productId });
        if (!product) {
            throw new NotFoundException("Product not found!");
        }
    
        const productCategories: IProductCategories[] = categories.map((category: ICategory) => {
            return {
                product: product,
                category: category
            };
        });
    
        const save = await this.categoriesRepo.save(productCategories);
        
        return save;
    }

}