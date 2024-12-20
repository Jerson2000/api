import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


export const encrypPassword = async (pass: string) => {
    return bcrypt.hashSync(pass, 12);
}
/** the token expires in 15mins */
export const generateToken = (userId: Object) => {
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}
