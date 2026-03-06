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

export const createUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email(),
  password: z.string().min(5, 'Password must be at least 5 characters long'),
});

export type UserRegistrationForm = z.infer<typeof createUserSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(5, 'Current password is required'),
    newPassword: z
      .string()
      .min(5, 'New password must be at least 5 characters long'),
    confirmPassword: z.string().min(5, 'Confirm password is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Password = z.infer<typeof changePasswordSchema>;
export type UpdatePasswordForm = Pick<
  Password,
  'currentPassword' | 'newPassword' | 'confirmPassword'
>;
