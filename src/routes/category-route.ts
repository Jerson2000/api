import { Router } from "express";
import { errorHandler } from "../exceptions/error-handler";
import authMiddleware from "../middlewares/auth-middleware";
import { addCategory, categoryList, getCategory, updateCategory } from "../controllers/category-controller";

const categoryRoutes: Router = Router();


categoryRoutes.post('/', [authMiddleware], errorHandler(addCategory));
categoryRoutes.put('/:id', [authMiddleware], errorHandler(updateCategory));
categoryRoutes.get('/', [authMiddleware], errorHandler(categoryList));
categoryRoutes.get('/:id', [authMiddleware], errorHandler(getCategory));

export default categoryRoutes;