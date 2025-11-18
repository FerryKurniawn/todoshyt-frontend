import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { taskSchema, TaskSchema } from "@/lib/taskSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useTask = () => {
  const [tasks, setTasks] = useState<TaskSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalTasks, setTotalTasks] = useState(0);

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: "",
      description: "",
    },
  });

  const getTasks = async (customPage?: number) => {
    try {
      setLoading(true);

      const currentPage = customPage || page;

      const response = await axiosInstance.get("/tasks", {
        params: {
          page: currentPage,
          limit,
        },
      });

      setTasks(response.data.tasks);
      setTotalTasks(response.data.totalTasks);
      setPage(response.data.page);
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
      await getTasks(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      await getTasks(page);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id: number, task: TaskSchema) => {
    try {
      await axiosInstance.patch(`/tasks/${id}`, task);
      await getTasks(page);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks(page);
  }, []);

  return {
    data: tasks,
    loading,
    addTask,
    deleteTask,
    getTasks,
    form,
    updateTask,
    page,
    limit,
    totalTasks,
    setPage,
  };
};
