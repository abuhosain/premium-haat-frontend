import { z } from "zod";

export const createProductValidationSchema = z.object({
  title: z.string().min(6, "Title must be at least 6 characters."),
  description: z.string().min(6, "Description must be at least 6 characters."),
  price: z.coerce.number().min(0.01, "Price must be greater than 0."),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1."),
  discount: z.coerce.number().min(0, "Discount must be 0 or greater."),
  categoryId: z.string().uuid("Invalid category ID."),
});
