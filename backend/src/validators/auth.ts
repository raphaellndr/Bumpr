import z from "zod";

export const authValidator = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(8, { error: "Password must contain at least 8 characters" }),
});

export type AuthInput = z.infer<typeof authValidator>;
