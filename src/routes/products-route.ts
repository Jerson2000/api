import { Router } from "express";
import { errorHandler } from "../exceptions/error-handler";
import authMiddleware from "../middlewares/auth-middleware";
import { addProduct, addProductImages, getProduct, productList, updateProduct } from "../controllers/products-controller";
import { UploadsDestinationEnum, UploadUtil } from "../utils/upload-utils";
import cacheMiddleware from "../middlewares/memory-cache-middleware";

const productRoutes: Router = Router();

const util = new UploadUtil(UploadsDestinationEnum.PRODUCTS_UPLOAD);

productRoutes.post("/", [authMiddleware], errorHandler(addProduct))
productRoutes.get('/', [authMiddleware,cacheMiddleware], errorHandler(productList));
productRoutes.get('/:id', [authMiddleware], errorHandler(getProduct));
productRoutes.put('/:id', [authMiddleware], errorHandler(updateProduct))
productRoutes.post('/images/:id', [authMiddleware, util.upload.array('images', 8)], errorHandler(addProductImages))

export default productRoutes;