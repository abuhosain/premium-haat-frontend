// src/schemas/register.schema.ts
import { z } from "zod";

const registerValidationSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters."),
  lastName: z.string().min(2, "Name must be at least 2 characters."),
  address: z.string().min(2, "Address must be at least 5 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  phone: z
    .string()
    .min(6, "Phone number must be at least 10 digits.")
    .regex(/^\d+$/, "Phone number must contain only digits."),
});
export const vendorRegisterValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(2, "Description must be at least 6 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  phone: z
    .string()
    .min(6, "Phone number must be at least 10 digits.")
    .regex(/^\d+$/, "Phone number must contain only digits."),
});

export default registerValidationSchema;
