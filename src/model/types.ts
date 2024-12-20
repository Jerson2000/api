import { Request } from "express";

export enum ROLE {
    ADMIN = "admin",
    USER = "user"
}

export interface CustomRequest extends Request {
    currentUser: any
}

export interface IUser {
    id?: number;
    username?: string
    firstName?: string;
    lastName?: string;
    age?: number;
    gender?: string;
    address?: string;
    email?: string;
    role?: ROLE
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedDate?: Date
}

export interface IProducts {
    id?: number;
    name?: string;
    description?: string;
    quantity?: number;
    price?: number;
    categories?: IProductCategories[] | null;
    images?: IProductImages[] | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedDate?: Date
}

export interface ICategory {
    id?: number;
    name?: string;
    product_category?: IProductCategories[] | null;
    createdAt?: Date
}

export interface IProductImages {
    id?: number;
    path?: string;
    products?: IProducts | null;
    createdAt?: Date;
}
export interface IProductCategories {
    id?: number;
    category?: ICategory | null;
    product?: IProducts | null;
    createdAt?: Date;
}

export interface IOTP {
    id?: number;
    code?: string;
    validityDuration?: number;
    createdAt?: Date;
    user: IUser

}