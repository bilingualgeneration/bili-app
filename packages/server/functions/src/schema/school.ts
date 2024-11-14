import { z } from "zod";

export const schoolSchema = z.object({
  emailDomains: z.array(z.string()),
  name: z.string(),
});
