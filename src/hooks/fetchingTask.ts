import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { TaskSchema } from "@/lib/taskSchema";
export const useFetchTask = () => {
  const [tasks, setTasks] = useState<TaskSchema[]>([]);

  useEffect(() => {
    const fetchingTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks");
        const getTask = response.data.task;
        setTasks(getTask);
      } catch (error) {
        console.error(error);
      }
    };
    fetchingTasks();
  }, []);
  return { data: tasks };
};
