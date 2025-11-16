import { useSpaceGrotesk } from "@/fonts/space_grotesk";
import { useFetchTask } from "@/hooks/fetchingTask";
import Card from "@/components/Card";
export default function Home() {
  const font = useSpaceGrotesk();
  const { data: tasks } = useFetchTask();
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
              className="flex flex-col gap-4 shadow-md bg-white mt-6 md:w-[1000px] md:min-h-32 md:max-h-[400px] rounded-xl p-6 hover:shadow-lg"
            >
              <h1 className="font-bold text-4xl">{task.taskName}</h1>
              <p className="line-clamp-5 text-lg">{task.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl font-light mt-20">No task nyet.</p>
      )}
    </div>
  );
}
