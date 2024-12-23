import { CustomRequest, } from "../model/types"
import { Response, NextFunction } from "express";
import { nodeCache } from "../utils/node-cache-utils";

const cacheMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const key = req.originalUrl;
    if (req.method === 'GET') {
        if (nodeCache.get(key)) {
            return res.send(JSON.parse(nodeCache.get(key)))
        }
        const originalSend = res.send.bind(res);

        res.send = (body: any) => {
            nodeCache.set(key, body)
            return originalSend(body);
        };

        next();
    } else next()

};

export default cacheMiddleware;
