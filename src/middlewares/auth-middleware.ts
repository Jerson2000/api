import * as jwt from 'jsonwebtoken';
import { CustomRequest, IUser } from "../model/types"
import { Response, NextFunction } from "express";
import { AppDataSource } from '../config/db-config';
import { Users } from '../model/user-entity';
import { UnauthorizedException } from '../exceptions/http-exception';
import { ENV_ACCESS_TOKEN } from '../utils/env-utils';
import { nodeCache } from '../utils/node-cache-utils';

const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            next(new UnauthorizedException("Access denied!"))
            return;
        }

        const payload = jwt.verify(token, ENV_ACCESS_TOKEN) as any;

        if (nodeCache.get(token)) {
            req.currentUser = nodeCache.get(token);
            next();
        } else {
            const user = await AppDataSource.getRepository(Users).findOneBy({ id: payload.userId })
            if (!user) {
                next(new UnauthorizedException("Access denied!"))
                return;
            }
            nodeCache.set(token, user,300);
            req.currentUser = user;
            next();
        }

    } catch (error) {
        next(new UnauthorizedException("Access denied!", error))
    }

}

export default authMiddleware;