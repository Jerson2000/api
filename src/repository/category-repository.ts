import { Repository } from "typeorm";
import { Categories } from "../model/category-entity";
import { AppDataSource } from "../config/db-config";
import { ICategory } from "../model/types";
import { NotFoundException } from "../exceptions/http-exception";

export class CategoryRepository {
    private repo: Repository<Categories>;

    constructor() {
        this.repo = AppDataSource.getRepository(Categories);
    }

    async addCategory(cat: ICategory): Promise<ICategory> {
        return await this.repo.save(cat);
    }

    async categoryList(): Promise<ICategory[]> {
        const x = await this.repo.find();
        return x;
    }

    async updateCategory(catId: number, cat: ICategory): Promise<ICategory> {
        const checkCat = await this.repo.findOneBy({
            id: catId
        })
        if (!checkCat) {
            throw new Error("Category not found!")
        }
        return await this.repo.save(cat);
    }
    async getCategory(catId: number): Promise<ICategory> {
        const x = await this.repo.findOneBy({
            id: catId
        })
        if (!x) {
            throw new NotFoundException("Category not found!");
        }
        return x;
    }


}