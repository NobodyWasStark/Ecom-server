import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name is too short"),
    description: z.string(),
    price: z.number().positive("Price must be positive"), // In cents (100 = 1 Taka)
    stock: z.number().int().nonnegative(),
    is_preorder: z.boolean().default(true),
    image_url: z.string().url().optional(),
  }),
});