import { z } from "zod";

export const clientSchema = z.object({
  id: z.string(),
  full_name: z.string().nonempty("Nome é obrigatório"),
  email: z
    .string()
    .email("Deve ser um email válido")
    .nonempty("Email é obrigatório"),
  phone: z.string().nonempty("Número obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
  register_date: z.string(),
});

export const loginSchema = clientSchema.omit({
  id: true,
  full_name: true,
  phone: true,
  register_date: true,
});

export const registerSchema = clientSchema.omit({
  id: true,
  register_date: true,
});

export const clientReturnSchema = clientSchema.omit({
  password: true,
});

export type ClientData = z.infer<typeof clientSchema>;
export type ClientRegisterData = z.infer<typeof registerSchema>;
export type ClientReturnData = z.infer<typeof clientReturnSchema>;
export type LoginData = z.infer<typeof loginSchema>;
