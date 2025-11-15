import { z } from "zod";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

const taskSchema = z.object({
  id: z.number(),
  taskName: z.string().min(1),
  description: z.string(),
});

type TaskSchema = z.infer<typeof taskSchema>;

export const useFetchTask = () => {
  const [tasks, setTasks] = useState<TaskSchema[]>([]);

  useEffect(() => {
    const fetchingTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks");
        const getTask = response.data.getTask;
        setTasks(getTask);
      } catch (error) {
        console.error(error);
      }
    };
    fetchingTasks();
  }, []);
  return { data: tasks };
};
