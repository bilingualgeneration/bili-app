import { z } from "zod";

export const classroomSchema = z.object({});

export type Classroom = z.infer<typeof classroomSchema>;
