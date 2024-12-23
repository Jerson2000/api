import { CustomRequest, } from "../model/types"
import { Response, NextFunction } from "express";

const headerCacheMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
        res.setHeader("Cache-Control", "no-cache");
        return next();
    }

    if (req.url.match(/\.(css|js|svg)$/)) {
        res.setHeader("Cache-Control", "public, max-age=7200"); // Cache for 2 hour
    } else {
        res.setHeader("Cache-Control", "public, max-age=7200"); // Cache for 2 hour
    }
    next();
};

export default headerCacheMiddleware;