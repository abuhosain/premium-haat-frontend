import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(6, "Password need to be at least 6 character"),
});
export default loginValidationSchema;

export const forgotPasswordValidationSchema = z.object({
  email: z.string().trim().email("Please Enter a valid Email!"),
});

export const resetPasswordValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const changePasswordValidationSchema = z.object({
  oldPassword: z.string().min(6, "Password must be at least 6 characters long"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});
