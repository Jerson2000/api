import { Router } from "express";
import { errorHandler } from "../exceptions/error-handler";
import authMiddleware from "../middlewares/auth-middleware";
import { login, me, signup } from "../controllers/auth-controller";

const authRoutes: Router = Router();

authRoutes.post('/login', errorHandler(login));
authRoutes.post('/signup', errorHandler(signup));
authRoutes.get('/me', [authMiddleware], errorHandler(me));

export default authRoutes;