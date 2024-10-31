import { languageSchema } from "./language";
import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().max(32).min(8),
});

export const profileSchema = z.object({
  name: z.string(),
  language: languageSchema,
  role: z.enum(["parent", "student", "teacher"]),
  schoolName: z.string(),
  grades: z.string(),
  schoolRole: z.string(),
  plan: z.string(),
  planExpiration: z.date(),
  isInclusive: z.boolean(),
  isImmersive: z.boolean(),
});
