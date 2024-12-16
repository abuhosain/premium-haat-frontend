import { z } from "zod";

export const createCategoryValidationSchema = z.object({
  name: z.string().min(2, "Title must be at least 6 characters."),
});
