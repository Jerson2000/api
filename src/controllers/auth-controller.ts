import { CustomRequest } from "../model/types"
import { Response } from "express"
import { UserRepository } from "../repository/users-repository"
import { SignInValidation, UserValidation } from "../exceptions/validations";

const repo = new UserRepository();

export const signup = async (req: CustomRequest, res: Response) => {
    UserValidation.parse(req.body);
    const promise = await repo.createAccount(req.body)
    res.json(promise);
}

export const login = async (req: CustomRequest, res: Response) => {
    SignInValidation.parse(req.body);
    const { username, password } = req.body;
    const promise = await repo.login(username, password);
    res.json(promise);
}

export const me = async (req: CustomRequest, res: Response) => {
    res.json(req.currentUser);
}