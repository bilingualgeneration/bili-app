import { z } from "zod";

export const languageSchema = z.enum(["es", "en", "esen"]);
