// schoolSchema.ts

import { z } from "zod";

// Define a schema for a single school
const schoolSchema = z.object({
  emailDomains: z.array(z.string()).nonempty("emailDomains cannot be empty"),
  id: z.string().optional(),
  name: z.string().min(1, "Name cannot be empty"),
});

// Define the main schema for school input
const schoolUpsertInputSchema = z.object({
  environment: z.enum(["development", "live"]),
  payload: z.array(schoolSchema),
});

// Export types
export type SchoolUpsertInput = z.infer<typeof schoolUpsertInputSchema>;
export { schoolUpsertInputSchema };
