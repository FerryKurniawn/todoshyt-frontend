import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().optional(),
  taskName: z.string().min(1, "this fields are required"),
  description: z.string(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
