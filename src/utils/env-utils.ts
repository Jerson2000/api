import dotenv from 'dotenv'
dotenv.config();


export const ENV_HOST = process.env.HOST_
export const ENV_ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
export const ENV_USERNAME = process.env.USERNAME_
export const ENV_PASSWORD = process.env.PASSWORD_
export const ENV_DATABASE = process.env.DATABASE_
export const ENV_PORT = process.env.HOST_

export const ENV_MAILER_HOSTNAME = process.env.MAILER_HOSTNAME
export const ENV_MAILER_USERNAME = process.env.MAILER_USERNAME
export const ENV_MAILER_PASSWORD = process.env.MAILER_PASSWORD

export const ENV_UNSTASH_REDIS = process.env.UNSTASH_REDIS!

export const APP_PORT = 2828