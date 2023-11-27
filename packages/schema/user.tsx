import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string()
	       .max(32)
	       .min(8)
});

export const profileSchema = z.object({
    name: z.string(),
    language: z.string(), // handles inclusivity choice
    role: z.string(),
    schoolName: z.string(),
    //marketingUpdates: z.boolean(),
    grades: z.string(),
    schoolRole: z.string(),
    isImmersion: z.boolean()
});
