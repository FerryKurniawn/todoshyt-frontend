import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().optional(),
  userId: z.string().optional(),
  taskName: z.string().min(1),
  description: z.string(),
});

export type TaskSchema = z.infer<typeof taskSchema>;

export const taskFormSchema = z.object({
  taskName: z.string().min(1),
  description: z.string(),
});
