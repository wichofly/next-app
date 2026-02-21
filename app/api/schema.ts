import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  username: z.string(),
  email: z.string().email(),
});

export const productSchema = z.object({
  name: z.string(),
  price: z.number().positive(),
});