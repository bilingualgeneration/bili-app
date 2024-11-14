import { studentSchema } from "@bili/schema/student";
import { z } from "zod";

const studentUpsertInputSchema = z.object({
  environment: z.enum(["development", "live"]),
  payload: z.array(
    studentSchema.extend({
      id: z.string().optional(),
    }),
  ),
});

export type StudentUpsertInput = z.infer<typeof studentUpsertInputSchema>;
export { studentUpsertInputSchema };
