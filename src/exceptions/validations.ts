import { z } from "zod";

export const SignInValidation = z.object({
    username: z.string(),
    password: z.string()
})

export const UserValidation = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    age: z.number().nullable(),
    gender: z.string().nullable(),
    address: z.string().nullable(),
    email: z.string(),
    password: z.string()
});


export const ProductsValidation = z.object({
    name: z.string(),
    description: z.string(),
    quantity: z.number(),
    price: z.number()
})

export const CategoryValidation = z.object({
    name: z.string()
})