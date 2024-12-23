import { Router } from "express";
import { errorHandler } from "../exceptions/error-handler";
import authMiddleware from "../middlewares/auth-middleware";
import { addProduct, addProductCategory, addProductImages, getProduct, productList, updateProduct } from "../controllers/products-controller";
import { UploadsDestinationEnum, UploadUtil } from "../utils/upload-utils";

const productRoutes: Router = Router();

const util = new UploadUtil(UploadsDestinationEnum.PRODUCTS_UPLOAD);

productRoutes.post("/", [authMiddleware], errorHandler(addProduct))
productRoutes.get('/', [authMiddleware], errorHandler(productList));
productRoutes.get('/:id', [authMiddleware], errorHandler(getProduct));
productRoutes.put('/:id', [authMiddleware], errorHandler(updateProduct))
productRoutes.post('/images/:id', [authMiddleware, util.upload.array('images', 8)], errorHandler(addProductImages))
productRoutes.post('/category/:id', [authMiddleware], errorHandler(addProductCategory))


export default productRoutes;