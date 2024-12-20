import { CustomRequest } from "../model/types"
import { Response } from "express"
import { CategoryRepository } from "../repository/category-repository";
import { CategoryValidation } from "../exceptions/validations";


const repo = new CategoryRepository();

export const addCategory = async (req: CustomRequest, res: Response) => {
    CategoryValidation.parse(req.body);
    const promise = await repo.addCategory(req.body)
    res.json(promise);
}

export const updateCategory = async (req: CustomRequest, res: Response) => {
    const promise = await repo.updateCategory(parseInt(req.params.id), req.body)
    res.json(promise);
}

export const categoryList = async (req: CustomRequest, res: Response) => {
    const x = await repo.categoryList();
    res.json(x);
}

export const getCategory = async (req: CustomRequest, res: Response) => {
    const x = await repo.getCategory(parseInt(req.params.id));
    res.json(x);
}