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
    id: z.number().nullable(),
    name: z.string()
})

const categoryUniqueArray = (schema:any) => 
    z.array(schema).refine((items) => new Set(items.map(item => item.id)).size === items.length, {
        message: "All items must be unique, no duplicate IDs allowed.",
    });
    
export const addProductCategoryValidation = z.object({
    categories: categoryUniqueArray(CategoryValidation),
});