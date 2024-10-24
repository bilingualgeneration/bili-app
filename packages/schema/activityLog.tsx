import { z } from "zod";

export const activityLogSchema = z.object({
  activity: z.string(),
  activityId: z.string(),
  userId: z.string(),
  timestamp: z.string(), // TODO: could be datetime?
  timeSpent: z.number(),
  version: z.string(),
  type: z.string(),
  data: z.any().optional(),
  language: z.array(["es", "en", "esen"]),
  classroomId: z.string().optional(),
});
