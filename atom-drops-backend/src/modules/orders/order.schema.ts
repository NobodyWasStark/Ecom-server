import { z } from 'zod';

export const createOrderSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        product_id: z.string().uuid(),
        quantity: z.number().int().positive(),
      })
    ).min(1, "Order must contain at least one item"),
  }),
});