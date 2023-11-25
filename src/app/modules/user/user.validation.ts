import { z } from 'zod';

const userFullNameSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().max(20),
});

const userAddressSchema = z.object({
  street: z.string().refine((data) => data.length > 0, {
    message: 'Street is required',
  }),
  city: z.string().refine((data) => data.length > 0, {
    message: 'City is required',
  }),
  country: z.string().refine((data) => data.length > 0, {
    message: 'Country is required',
  }),
});

const orderItemSchema = z.object({
  productName: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().int().min(1),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().max(15),
  password: z.string().max(20),
  fullName: userFullNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().optional().default(false),
  hobbies: z.array(z.string()).default([]),
  address: userAddressSchema,
  orders: z.array(orderItemSchema).default([]),
});

// export default userValidationSchema;
