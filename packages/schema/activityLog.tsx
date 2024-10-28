import { z } from "zod";

export const activityLogSchema = z.object({
  activity: z.string(),
  activityId: z.string(),
  userId: z.string(),
  timestamp: z.any(),
  timeSpent: z.number(),
  version: z.string(),
  type: z.string(),
  data: z.any().optional(),
  language: z.enum(["es", "en", "esen"]),
  classroomId: z.string().optional(),
});

export type ActivityLog = z.infer<typeof activityLogSchema>;
