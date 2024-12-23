import NodeCache from "node-cache";
// 30secs cache expired at 35 the cache will delete
export const nodeCache = new NodeCache({ stdTTL: 30, checkperiod: 35 });

