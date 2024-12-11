import { languageSchema } from "./language";
import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().max(32).min(8),
});

export const profileSchema = z.object({
  grades: z.array(z.string()).optional(),
  isInclusive: z.boolean(),
  language: languageSchema,
  name: z.string(),
  role: z.enum(["parent", "student", "teacher"]),
  schoolName: z.string().optional(),
  schoolRole: z.string().optional(),
  studentLanguage: languageSchema.optional(),
  phone: z.string().optional(),
  plan: z.string().optional(),
  planExpiration: z.date().optional(),
});
