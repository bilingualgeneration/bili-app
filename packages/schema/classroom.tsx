import { languageSchema } from "./language";
import { z } from "zod";

export const gradeSchema = z.enum([
  "p", // pre-k
  "k", // kinder
  "1",
  "2",
  "3",
  "4",
  "5",
  "o", // other
]);

export const classroomSchema = z.object({
  allowLanguageToggle: z.boolean(),
  allowedLanguages: z.array(languageSchema),
  grades: z.array(gradeSchema),
  isActive: z.boolean(),
  isInclusive: z.boolean(),
  name: z.string(),
  school: z.string(),
  size: z.number(),
  teachers: z.array(z.string()),
});

export type Classroom = z.infer<typeof classroomSchema>;
