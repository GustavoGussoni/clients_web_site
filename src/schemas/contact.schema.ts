import { z } from "zod";

export const contactSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  email: z.string(),
  phone: z.string(),
  register_date: z.string(),
  clientId: z.string(),
});

export type contactData = z.infer<typeof contactSchema>;
