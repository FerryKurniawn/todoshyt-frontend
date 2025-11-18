import { useSpaceGrotesk } from "@/fonts/space_grotesk";
import { useTask } from "@/hooks/useFetching";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
  const font = useSpaceGrotesk();
  const {
    data: tasks,
    addTask,
    deleteTask,
    updateTask,
    loading,
    form,
  } = useTask();

  return (
    <div
      className={`h-screen flex flex-col items-center p-10 ${font.className}`}
    >
      <h1 className="text-6xl font-bold">TodoShyt</h1>
      <p className="text-xl font-light mt-4">Keep your tasks organized</p>

      <TaskForm form={form} addTask={addTask} />

      {loading && (
        <div className="flex items-center justify-center py-10">
          <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-black animate-spin" />
        </div>
      )}

      {tasks && tasks.length > 0 ? (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ) : (
        <p className="text-xl font-light mt-20">No task nyet.</p>
      )}
    </div>
  );
}
