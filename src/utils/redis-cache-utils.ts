import Redis from "ioredis"
import { ENV_UNSTASH_REDIS } from "./env-utils";

export const redis = new Redis(ENV_UNSTASH_REDIS);
