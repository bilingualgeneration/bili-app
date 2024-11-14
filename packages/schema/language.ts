import { z } from "zod";

export const languageSchema = z.enum([
  "es",
  "en",
  "es.en",
  "en.es",
  "esen", // temporary
]);
