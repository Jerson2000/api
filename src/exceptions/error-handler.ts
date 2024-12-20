import { CustomRequest } from "../model/types";
import { Response, NextFunction } from "express";
import { BadRequestException, HTTPException, InternalException } from "./http-exception";
import { ZodError } from "zod";



export const errorHandler = (method: Function) => {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error: any) {
            let exception: HTTPException
            if (error instanceof HTTPException) {
                exception = error
            } else if (error instanceof ZodError) {
                exception = new BadRequestException("Unprocessable Entity", error);
            }
            else {
                exception = new InternalException("Something went wrong!", { message: error.message, error })
            }

            next(exception);
        }
    }
} 