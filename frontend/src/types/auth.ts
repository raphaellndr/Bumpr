import z from "zod";

export const AuthLoginSchema = z.jwt();

export const AuthRegisterSchema = z.object({
  id: z.number(),
  email: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AuthCredentialsSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type AuthLogin = z.infer<typeof AuthLoginSchema>;
export type AuthRegister = z.infer<typeof AuthRegisterSchema>;
export type AuthCredentialsDTO = z.infer<typeof AuthCredentialsSchema>;
