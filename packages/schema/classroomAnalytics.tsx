import { z } from "zod";

const timeBreakdownByLanguageSchema = z.object({
  en: z.number(),
  es: z.number(),
  esen: z.number(),
});

export const timeSpentAtLocationSchema = z.object({
  community: timeBreakdownByLanguageSchema,
  games: timeBreakdownByLanguageSchema,
  stories: timeBreakdownByLanguageSchema,
  wellness: timeBreakdownByLanguageSchema,
});

const studentBreakdownSchema = z.object({
  studentId: z.string(),
  idMajor: z.string(),
  idMinor: z.string(),
  completions: z.number(),
  stars: z.number(),
  hearts: z.number(),
});

export const classroomAnalyticsSchema = z.object({
  classroomId: z.string(),
  timeBreakdown: z.object({
    atHome: timeSpentAtLocationSchema,
    atSchool: timeSpentAtLocationSchema,
  }),
  studentBreakdown: z.object({
    atHome: z.array(studentBreakdownSchema),
    atSchool: z.array(studentBreakdownSchema),
  }),
  studentNeeds: z.array(z.string()),
  studentHighlights: z.array(z.string()),
});

export type ClassroomAnalytics = z.infer<typeof classroomAnalyticsSchema>;
export type StudentBreakdown = z.infer<typeof studentBreakdownSchema>;
export type TimeBreakdownByLanguage = z.infer<
  typeof timeBreakdownByLanguageSchema
>;
export type TimeSpentAtLocation = z.infer<typeof timeSpentAtLocationSchema>;
