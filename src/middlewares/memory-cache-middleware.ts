import { CustomRequest, } from "../model/types"
import { Response, NextFunction } from "express";

const cache: Record<string, any> = {};

const cacheMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const key = req.originalUrl || req.url;
    if (cache[key]) {
        console.log('Serving from cache:', key);
        return res.send(JSON.parse(cache[key]));
    }

    const originalSend = res.send.bind(res);

    res.send = (body: any) => {
        cache[key] = body;
        console.log('Caching response:', key);
        return originalSend(body);
    };

    next();
};

export default cacheMiddleware;
