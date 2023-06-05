import { z } from "zod";

export const contactSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  email: z.string(),
  phone: z.string(),
  register_date: z.string(),
  clientId: z.string(),
});

export const createContactSchema = contactSchema.omit({
  id: true,
  register_date: true,
  clientId: true,
});

export type contactData = z.infer<typeof contactSchema>;
export type createContactData = z.infer<typeof createContactSchema>;
