import { z } from "zod";

export const studentNoteSchema = z.object({
  skill: z.string(),
  language: z.enum(["es", "en", "esen"]),
  score: z.number(),
});

export const studentTagSchema = z.object({
  tag: z.enum([
    // + is positive
    // - is warning
    // ! is danger
    "+on track",
    "-support recommended",
    "!needs support",
    "-home account inactive",
  ]),
});

export const studentAnalyticsSchema = z.object({
  id: z.string(),
  highlights: z.array(studentNoteSchema),
  needs: z.array(studentNoteSchema),
  tags: z.array(studentTagSchema),
  languageBreakdown: z.object({
    es: z.number(),
    en: z.number(),
    esen: z.number(),
  }),
  timeBreakdown: z.object({
    atHome: z.number(),
    atSchool: z.number(),
  }),
});

export type StudentAnalytics = z.infer<typeof studentAnalyticsSchema>;
