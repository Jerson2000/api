import { CustomRequest } from "../model/types"
import { Response } from "express"
import { UserRepository } from "../repository/users-repository"
import { UserValidation } from "../exceptions/validations";

const repo = new UserRepository();

export const createAccount = async (req: CustomRequest, res: Response) => {
    UserValidation.parse(req.body);
    const promise = await repo.createAccount(req.body)
    res.json(promise);
}


export const updateUser = async (req: CustomRequest, res: Response) => {
    const id = parseInt(req.params.id)
    const x = await repo.updateUser(id, req.body)
    res.json(x)
}


export const userList = async (req: CustomRequest, res: Response) => {
    const x = await repo.userList();
    res.json(x);
}

export const deleteUser = async (req: CustomRequest, res: Response) => {
    const x = await repo.deleteUser(parseInt(req.params.id))
    res.json(x);
}

export const getUser = async (req: CustomRequest, res: Response) => {   
    const x = await repo.getUser(parseInt(req.params.id))
    res.json(x);
}

/**
 * send otp base on the session
 */
export const sendOTP = async (req: CustomRequest, res: Response) => {
    const x = await repo.sendOTP(req.currentUser);
    res.json(x);
}

export const validateOTP = async (req: CustomRequest, res: Response) => {
    const { code } = req.body;
    const x = await repo.validateOTP(code, req.currentUser);
    res.json(x);
}