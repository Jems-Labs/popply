import { z } from "zod";

export const createShopSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  description: z.string().min(1, "Description is required"),
  category: z.string(),
  uniqueUrl: z.string(),
  logo: z.any(),
  banner: z.any(),
});
export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email(),
  password: z.string(),
});


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})
export const updateShopSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  description: z.string().min(1, "Description is required"),
  category: z.string(),
});

export const addProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  productUrl: z.string(),
  image: z.any()
})