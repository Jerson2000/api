import { Router } from "express";
import { errorHandler } from "../exceptions/error-handler";
import authMiddleware from "../middlewares/auth-middleware";
import { addProduct, addProductImages, getProduct, productList, updateProduct } from "../controllers/products-controller";
import multer from "multer";

const productRoutes: Router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/products');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

productRoutes.post("/", [authMiddleware], errorHandler(addProduct))
productRoutes.get('/', [authMiddleware], errorHandler(productList));
productRoutes.get('/:id', [authMiddleware], errorHandler(getProduct));
productRoutes.put('/:id', [authMiddleware], errorHandler(updateProduct))
productRoutes.post('/:id', [authMiddleware,upload.array('images', 8)], errorHandler(addProductImages))

export default productRoutes;