import { CustomRequest } from "../model/types"
import { Response } from "express"
import { ProductRepository } from "../repository/products-repository";


const repo = new ProductRepository();

export const addProduct = async (req: CustomRequest, res: Response) => {
    const promise = await repo.addProduct(req.body)
    res.json(promise);
}

export const productList = async (req: CustomRequest, res: Response) => {
    const promise = await repo.productList()
    res.json(promise);
}

export const getProduct = async (req: CustomRequest, res: Response) => {
    const promise = await repo.getProduct(parseInt(req.params.id))
    res.json(promise);
}

export const updateProduct = async (req: CustomRequest, res: Response) => {
    const xxx = await repo.updateProduct(parseInt(req.params.id), req.body);
    res.json(xxx)
}

export const addProductImages = async (req: CustomRequest, res: Response) => {

    /**
     * @todo prevent other files to be uploaded only mime type jpg/jpeg/png
     *
     * 
     */
   
    const files = req.files as Express.Multer.File[] | undefined;
    const uploadedFiles = files.map(file => ({
        filename: file.filename,
        path: file.path,
        size: file.size,
    }));

    const promise = await repo.addProductImages(parseInt(req.params.id), uploadedFiles);
    res.json(promise);
}