import { Router } from "express";
import { errorHandler } from "../exceptions/error-handler";
import authMiddleware from "../middlewares/auth-middleware";
import { createAccount, deleteUser, getUser, sendOTP, updateUser, userList, validateOTP } from "../controllers/user-controller";

const userRoutes: Router = Router();

userRoutes.post("/", [authMiddleware], errorHandler(createAccount))
userRoutes.put('/:id', [authMiddleware], errorHandler(updateUser));
userRoutes.delete('/:id', [authMiddleware], errorHandler(deleteUser));
userRoutes.get('/', [authMiddleware], errorHandler(userList));
userRoutes.get('/:id', [authMiddleware], errorHandler(getUser));
userRoutes.post('/otp', [authMiddleware], errorHandler(sendOTP));
userRoutes.post('/validate', [authMiddleware], errorHandler(validateOTP));


export default userRoutes;