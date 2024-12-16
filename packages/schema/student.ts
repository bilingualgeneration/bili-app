import { z } from "zod";

export const studentSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  classroom: z.array(z.string()),
  caregiverEmail: z.array(z.string().email()).optional(),
});
