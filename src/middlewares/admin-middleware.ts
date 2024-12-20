import { CustomRequest, ROLE, } from "../model/types"
import { Response, NextFunction } from "express";
import { UnauthorizedException } from '../exceptions/http-exception';



const adminMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.currentUser    
    if (user.role === ROLE.ADMIN) {
        next()
    } else {
        next(new UnauthorizedException("Access denied"))
    }

}

export default adminMiddleware;