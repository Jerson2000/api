import { CustomRequest } from "../model/types"
import { Response } from "express"
import { UserRepository } from "../repository/users-repository"

const repo = new UserRepository();

export const signup = async (req: CustomRequest, res: Response) => {
    const promise = await repo.createAccount(req.body)
    res.json(promise);
}

export const login = async (req: CustomRequest, res: Response) => {
    const { username, password } = req.body;
    const promise = await repo.login(username, password);
    res.json(promise);
}

export const me = async (req: CustomRequest, res: Response) => {
    res.json(req.currentUser);
}