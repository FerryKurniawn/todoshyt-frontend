import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { taskSchema, TaskSchema } from "@/lib/taskSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useTask = () => {
  const [tasks, setTasks] = useState<TaskSchema[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: "",
      description: "",
    },
  });

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/tasks");
      setTasks(response.data.task);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: TaskSchema) => {
    try {
      setLoading(true);
      await axiosInstance.post("/tasks", task);
      form.reset({ taskName: "", description: "" });
      form.setFocus("taskName");
      await getTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      await getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return {
    data: tasks,
    loading,
    addTask,
    deleteTask,
    getTasks,
    form,
  };
};
