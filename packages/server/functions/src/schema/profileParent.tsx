import { languageSchema } from "./language";
import { z } from "zod";

export const profileParentSchema = z.object({
  country: z.string(),
  dailyPlaytimeLimit: z.string(),
  dob: z.date(),
  email: z.string().email(),
  isImmersive: z.boolean(),
  isInclusive: z.boolean(),
  isSoundEffects: z.boolean(),
  language: languageSchema,
  name: z.string(),
  phone: z.string(),
  role: z.enum(["parent", "teacher", "child"]), // a student is a child
});
