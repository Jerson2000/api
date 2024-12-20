import { Router } from "express";
import authRoutes from "./auth-route";
import userRoutes from "./users-route";
import productRoutes from "./products-route";
import categoryRoutes from "./category-route";

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes)
rootRouter.use('/users', userRoutes)
rootRouter.use('/products', productRoutes)
rootRouter.use('/categories', categoryRoutes)

export default rootRouter;