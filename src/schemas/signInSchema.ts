import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().length(6, "Identifier must be 6 digits long"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
