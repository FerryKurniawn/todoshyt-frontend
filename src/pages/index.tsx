import { useSpaceGrotesk } from "@/fonts/space_grotesk";
import { useFetchTask } from "@/hooks/fetchingTask";
import Card from "@/components/Card";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
export default function Home() {
  const font = useSpaceGrotesk();
  const { data: tasks } = useFetchTask();

  const [hover, setHover] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div
      className={`h-screen flex flex-col items-center p-10 ${font.className}`}
    >
      <h1 className="text-6xl font-bold">TodoShyt</h1>
      <p className="text-xl font-light mt-4">Keep your tasks organized</p>
      <Card />
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
                <div className="mt-3">
                  <input
                    type="checkbox"
                    className="scale-180"
                    onClick={() => setDone(!done)}
                  />
                </div>
                <div className={`${done && "opacity-50"}`}>
                  <h1
                    className={`font-bold text-4xl ${done && "line-through"}`}
                  >
                    {task.taskName}
                  </h1>
                  <p className="line-clamp-5 text-lg">{task.description}</p>
                </div>
              </div>
              {hover && (
                <div className="flex gap-6">
                  <Pencil
                    className="hover:cursor-pointer opacity-30 hover:text-[#7493c2] hover:opacity-100"
                    size={24}
                  />
                  <Trash
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
