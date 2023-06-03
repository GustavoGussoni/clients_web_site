import { z } from "zod";

export const clientSchema = z.object({
  full_name: z.string().nonempty("Nome é obrigatório"),
  email: z
    .string()
    .email("Deve ser um email válido")
    .nonempty("Email é obrigatório"),
  phone: z.string().nonempty("Número obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
});

export const loginSchema = clientSchema.omit({
  full_name: true,
  phone: true,
});

export type ClientData = z.infer<typeof clientSchema>;
export type LoginData = z.infer<typeof loginSchema>;
