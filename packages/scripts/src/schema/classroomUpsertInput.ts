import { classroomSchema } from "@bili/schema/classroom";
import { z } from "zod";

// Define the main schema for classroom input
const classroomUpsertInputSchema = z.object({
  environment: z.enum(["development", "live"]),
  payload: z.array(
    classroomSchema.extend({
      id: z.string().optional(),
    }),
  ),
});

// Export types
export type ClassroomUpsertInput = z.infer<typeof classroomUpsertInputSchema>;
export { classroomUpsertInputSchema };
