import * as jwt from 'jsonwebtoken';
import { CustomRequest, IUser } from "../model/types"
import { Response, NextFunction } from "express";
import dotenv from 'dotenv'
import { AppDataSource } from '../config/db-config';
import { Users } from '../model/user-entity';
import { HTTPException, UnauthorizedException } from '../exceptions/http-exception';

dotenv.config();


const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            next(new UnauthorizedException("Access denied!"))
            return;
        }

        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as any;
        const user = await AppDataSource.getRepository(Users).findOneBy({ id: payload.userId })

        if (!user) {
            next(new UnauthorizedException("Access denied!"))
            return;
        }
        req.currentUser = user;

        next();

    } catch (error) {
        next(new UnauthorizedException("Access denied!", error))
    }

}

export default authMiddleware;