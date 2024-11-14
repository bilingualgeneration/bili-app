import { classroomAnalyticsSchema } from "@bili/schema/classroomAnalytics";
import { z } from "zod";

// Define the main schema for classroom input
const classroomAnalyticsUpsertInputSchema = z.object({
  environment: z.enum(["development", "live"]),
  payload: z.array(
    classroomAnalyticsSchema.extend({
      id: z.string().optional(),
    }),
  ),
});

// Export types
export type ClassroomAnalyticsUpsertInput = z.infer<
  typeof classroomAnalyticsUpsertInputSchema
>;
export { classroomAnalyticsUpsertInputSchema };
