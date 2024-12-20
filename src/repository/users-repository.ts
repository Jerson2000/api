import { Repository } from "typeorm";
import { Users } from "../model/user-entity";
import { AppDataSource } from "../config/db-config";
import { IOTP, IUser } from "../model/types";
import { encrypPassword, generateToken } from "../utils/auth-utils";
import { compare } from "bcrypt";
import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from "../exceptions/http-exception";
import nodemailer from "nodemailer";
import { OTP } from "../model/otp-entity";
import { ENV_MAILER_HOSTNAME, ENV_MAILER_PASSWORD, ENV_MAILER_USERNAME } from "../utils/env-utils";

export class UserRepository {
    private repo: Repository<Users>
    private otpRepo: Repository<OTP>
    constructor() {
        this.repo = AppDataSource.getRepository(Users);
        this.otpRepo = AppDataSource.getRepository(OTP);
    }

    async createAccount(user: IUser): Promise<IUser> {
        if (!user.password || user.password == undefined) {
            user.password = "12345678"
        }

        const hash = await encrypPassword(user.password)
        user.password = hash;
        const checkUser = await this.repo.find({
            where: [
                { email: user.email },
                { username: user.username }
            ]
        });

        if (checkUser) {
            throw new ConflictException("Username is already exist!")
        }

        return await this.repo.save(user);
    }

    async updateUser(userId: number, user: IUser): Promise<IUser> {
        const checkUser = await this.repo.findOneBy({
            id: userId
        })
        if (!checkUser) {
            throw new NotFoundException("User not found!")
        }
        user.id = userId;
        return await this.repo.save(user);
    }

    async deleteUser(userId: number): Promise<any> {
        const checkUser = await this.repo.findOneBy({
            id: userId
        })
        if (!checkUser) {
            throw new NotFoundException("User not found!")
        }
        await this.repo.softDelete({ id: userId })

        return { message: "User has been deleted!" }
    }

    async login(username: string, password: string): Promise<any> {
        const checkUser = await this.repo.findOneBy({
            username
        })

        const checkPassword = await compare(password, checkUser.password);

        if (!checkUser || !checkPassword) {
            throw new ForbiddenException("Incorrect credentials!");
        }

        const token = generateToken({ userId: checkUser.id })

        if (checkUser) {
            delete checkUser.password
        }

        return { user: checkUser, token }
    }

    async userList(): Promise<IUser | any> {
        const list = await this.repo.find()
        return list
    }

    async getUser(userId: number): Promise<IUser> {
        const x = await this.repo.findOneBy({
            id: userId
        })
        if (!x) {
            throw new NotFoundException("User not found!")
        }

        return x;
    }



    async sendOTP(user: IUser): Promise<any> {
        if (!user.email || user.email === undefined || user.email === null) {
            throw new BadRequestException("Undefined email address!");
        }

        const code = this.generateOTP(5);
        const msg = this.createEmailMessage(user.email, code)
        try {
            const info = await this.sendEmail(msg);
            const otpInstance: IOTP = {
                code,
                user
            }
            if (info) {
                await this.otpRepo.save(otpInstance)
            }
            return { code, response: info.response }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async validateOTP(code: string, user: IUser): Promise<IUser> {
        const otp = await this.otpRepo.findOne({
            where: { user: { id: user.id } }
        })

        console.log(otp);

        if (otp.code !== code && !otp.isValid()) {
            throw new ForbiddenException("Invalid On-Time-Password!!");
        }

        return user;
    }



    private createEmailMessage(email: string, code: string) {
        return {
            from: ENV_MAILER_USERNAME,
            to: email,
            subject: 'One time password',
            html: this.getEmailHtml(code)
        };
    }

    private getEmailHtml(code: string): string {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verify your login</title>
                <style>
                    body {
                        font-family: Helvetica, Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #ffffff;
                    }
                    .container {
                        width: 100%;
                        border-collapse: collapse;
                        background-color: rgb(239, 239, 239);
                    }
                    .content {
                        max-width: 600px;
                        margin: auto;
                        background-color: #ffffff;
                        padding: 40px;
                    }
                    h1 {
                        margin: 1rem 0;
                    }
                    .verification-code {
                        font-size: 130%;
                        font-weight: bold;
                    }
                    .footer {
                        padding-top: 20px;
                        color: rgb(153, 153, 153);
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <table class="container">
                    <tr>
                        <td align="center">
                            <div class="content">
                                <div style="text-align: left;">
                                    <img src="https://i.ibb.co/6Dx01pC/Group-98.png" alt="Company" style="width: 120px;">
                                </div>
                                <h1>Verification code</h1>
                                <p>Please use the verification code below to sign in.</p>
                                <p class="verification-code">${code}</p>
                                <p>If you didn’t request this, you can ignore this email.</p>
                                <p>Thanks,<br>The JunkOut team</p>
                                <div class="footer">
                                    <p>JunkOut ♥</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </body>
            </html>`;
    }

    private async sendEmail(message): Promise<any> {
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(message, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }

    private generateOTP = (length: number) => {
        let digits = '0123456789';
        let OTP = '';
        let len = digits.length
        for (let i = 0; i < length; i++) {
            OTP += digits[Math.floor(Math.random() * len)];
        }
        return OTP;
    }

    private transporter = nodemailer.createTransport({
        host: ENV_MAILER_HOSTNAME,
        port: 587,
        secure: false,
        auth: {
            user: ENV_MAILER_USERNAME,
            pass: ENV_MAILER_PASSWORD,
        }
    })
}