import { HTTPException } from "../exceptions/http-exception"
import { CustomRequest } from "../model/types"
import { Response, NextFunction } from "express"


export const errorMiddleWare = (error: HTTPException, req: CustomRequest, res: Response, next: NextFunction) => {

    res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors
    })

}