import { z } from "zod";

const studentSummaryRecordSchema = z.object({
  id: z.string(),
  status: z.array(z.string()),
  isCaregiverAccountActivated: z.boolean(),
});

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
  classroom: z.string(), // id
  timeBreakdown: z.object({
    atHome: timeSpentAtLocationSchema,
    atSchool: timeSpentAtLocationSchema,
  }),
  studentBreakdown: z.object({
    atHome: z.array(studentBreakdownSchema),
    atSchool: z.array(studentBreakdownSchema),
  }),
  studentSummary: z.array(studentSummaryRecordSchema),
  keyStudentNeeds: z.array(z.string()),
  keyStudentHighlights: z.array(z.string()),
});

export type ClassroomAnalytics = z.infer<typeof classroomAnalyticsSchema>;
export type StudentBreakdown = z.infer<typeof studentBreakdownSchema>;
export type StudentSummaryRecord = z.infer<typeof studentSummaryRecordSchema>;
export type TimeBreakdownByLanguage = z.infer<
  typeof timeBreakdownByLanguageSchema
>;
export type TimeSpentAtLocation = z.infer<typeof timeSpentAtLocationSchema>;
