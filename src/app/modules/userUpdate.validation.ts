import { z } from 'zod';
const userFullNameSchema = z.object({
  firstName: z.string().min(2).max(20).optional(),
  lastName: z.string().max(20).optional(),
});

const userAddressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

const orderItemSchema = z.object({
  productName: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  quantity: z.number().int().min(1).optional(),
});

export const updateUserValidationSchema = z.object({
  userId: z.number().optional(),
  username: z.string().max(15).optional(),
  password: z.string().max(20).optional(),
  fullName: userFullNameSchema.optional(),
  age: z.number().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).default([]).optional(),
  address: userAddressSchema.optional(),
  orders: z.array(orderItemSchema).default([]).optional(),
});
