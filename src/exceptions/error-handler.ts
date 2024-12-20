import { CustomRequest } from "../model/types";
import { Response, NextFunction } from "express";
import { HTTPException, InternalException } from "./http-exception";



export const errorHandler = (method: Function) => {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error: any) {
            console.log(error);
            let exception: HTTPException
            if (error instanceof HTTPException) {
                exception = error
            } else {
                exception = new InternalException("Something went wrong!", { msg: error.message, error })
            }

            next(exception);
        }
    }
} 