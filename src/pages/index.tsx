import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { z } from "zod";
const taskSchema = z.object({
  id: z.number(),
  taskName: z.string().min(1),
  description: z.string(),
});

type TaskSchema = z.infer<typeof taskSchema>;

export default function Home() {
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

  return (
    <div
      className={`h-screen flex flex-col items-center p-10 ${spaceGrotesk.className}`}
    >
      <h1 className="text-6xl font-bold">TodoShyt</h1>
      <p className="text-xl font-light mt-4">Keep your tasks organized</p>
      <div className=" flex flex-col p-16">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col gap-4 shadow-md bg-white mt-6 md:w-[1200px] md:min-h-32 md:max-h-[400px] rounded-xl p-6 hover:shadow-lg"
          >
            <h1 className="font-bold text-4xl">{task.taskName}</h1>
            <p className="line-clamp-5 text-lg">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
