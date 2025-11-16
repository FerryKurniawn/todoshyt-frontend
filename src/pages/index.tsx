import { useSpaceGrotesk } from "@/fonts/space_grotesk";
import { useTask } from "@/hooks/useFetching";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const font = useSpaceGrotesk();
  const { data: tasks, addTask, deleteTask, loading, form } = useTask();
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`h-screen flex flex-col items-center p-10 ${font.className}`}
    >
      <h1 className="text-6xl font-bold">TodoShyt</h1>
      <p className="text-xl font-light mt-4">Keep your tasks organized</p>
      <form
        key={form.formState.submitCount}
        onSubmit={form.handleSubmit(addTask)}
        className="h-[500px] shadow-lg rounded-4xl m-4 p-6 w-[1000px] bg-white flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="taskName" className="font-medium">
            Task Name
          </label>
          <input
            id="taskName"
            className="p-4 bg-[#FAFAF9] rounded-lg focus:outline-gray-300"
            type="text"
            placeholder="What needs to be done?"
            {...form.register("taskName")}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="description" className="font-medium">
            description
          </label>
          <textarea
            id="description"
            rows={5}
            className="p-4 bg-[#FAFAF9] rounded-lg focus:outline-gray-300"
            placeholder="Add details about this task..."
            {...form.register("description")}
          />
        </div>
        <button
          type="submit"
          className="bg-black py-5 text-white font-bold rounded-full"
        >
          Add Task
        </button>
      </form>
      {loading && (
        <div className="flex items-center justify-center py-10">
          <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-black animate-spin" />
        </div>
      )}
      {tasks && tasks.length > 0 ? (
        <div className=" flex flex-col p-16">
          {tasks.map((task) => (
            <div
              key={task.id}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="flex gap-4 shadow-md bg-white mt-6 md:w-[1000px] md:min-h-32 md:max-h-[400px] rounded-xl p-6 hover:shadow-lg justify-between"
            >
              <div className="flex gap-4">
                <div className="mt-2">
                  <input type="checkbox" className="scale-130" />
                </div>
                <div className={`opacity-50`}>
                  <h1 className={`font-bold text-2xl`}>{task.taskName}</h1>
                  <p className="line-clamp-5 text-base">{task.description}</p>
                </div>
              </div>
              {hover && (
                <div className="flex gap-6">
                  <Pencil
                    className="hover:cursor-pointer opacity-30 hover:text-[#7493c2] hover:opacity-100"
                    size={24}
                  />
                  <Trash
                    onClick={() => deleteTask(task.id!)}
                    className="hover:cursor-pointer opacity-30 hover:text-[#EF4444] hover:opacity-100"
                    size={24}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl font-light mt-20 ">No task nyet.</p>
      )}
    </div>
  );
}
