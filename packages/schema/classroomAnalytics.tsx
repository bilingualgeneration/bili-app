import { z } from "zod";
import { studentAnalyticsSchema } from "./studentAnalytics";

export const timeSpentAtLocationSchema = z.object({
  community: z.number(),
  games: z.number(),
  stories: z.number(),
  wellness: z.number(),
});

const studentBreakdownSchema = z.object({
  studentId: z.string(),
  idMajor: z.string(),
  idMinor: z.string(),
  completions: z.number(),
  stars: z.number(),
  hearts: z.number(),
});

const classroomStudentAnalyticsSchema = z.record(
  z.string(),
  studentAnalyticsSchema,
);

export const classroomAnalyticsSchema = z.object({
  classroom: z.string(),
  timeBreakdown: z.object({
    atHome: timeSpentAtLocationSchema,
    atSchool: timeSpentAtLocationSchema,
  }),
  studentBreakdown: z.object({
    atHome: z.array(studentBreakdownSchema),
    atSchool: z.array(studentBreakdownSchema),
  }),
  studentAnalytics: classroomStudentAnalyticsSchema,
});

export type ClassroomAnalytics = z.infer<typeof classroomAnalyticsSchema>;
export type ClassroomStudentAnalytics = z.infer<
  typeof classroomStudentAnalyticsSchema
>;
export type StudentBreakdown = z.infer<typeof studentBreakdownSchema>;
export type TimeSpentAtLocation = z.infer<typeof timeSpentAtLocationSchema>;
