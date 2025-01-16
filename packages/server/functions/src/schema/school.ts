import { z } from "zod";

export const schoolSchema = z.object({
  emailDomains: z.array(z.string()).optional(),
  name: z.string(),
});
