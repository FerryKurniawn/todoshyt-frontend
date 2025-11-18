import { useSpaceGrotesk } from "@/fonts/space_grotesk";
import { useTask } from "@/hooks/useFetching";
import FormTask from "@/components/TaskForm";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

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

  const [hover, setHover] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks
    ?.slice()
    .reverse()
    .slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = tasks ? Math.ceil(tasks.length / tasksPerPage) : 0;

  return (
    <div
      className={`h-screen flex flex-col items-center p-10 ${font.className}`}
    >
      <h1 className="text-6xl font-bold">TodoShyt</h1>
      <p className="text-xl font-light mt-4">Keep your tasks organized</p>
      <FormTask form={form} addTask={addTask} />
      {loading && (
        <div className="flex items-center justify-center py-10">
          <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-black animate-spin" />
        </div>
      )}

      {tasks && tasks.length > 0 ? (
        <div className="flex flex-col p-16">
          {currentTasks?.map((task) => (
            <div
              key={task.id}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={`flex gap-4 shadow-md bg-white mt-6 md:w-[1000px] rounded-xl p-6 hover:shadow-lg justify-between transition-all ${
                checked[task.id!] ? "opacity-50" : "opacity-100"
              }`}
            >
              <div className="flex gap-4 w-full">
                {editingId !== task.id && (
                  <div className="mt-2">
                    <input
                      type="checkbox"
                      className="scale-130"
                      checked={checked[task.id!] || false}
                      onChange={() =>
                        setChecked((prev) => ({
                          ...prev,
                          [task.id!]: !prev[task.id!],
                        }))
                      }
                    />
                  </div>
                )}

                {editingId !== task.id ? (
                  <div>
                    <h1
                      className={`font-bold text-2xl ${
                        checked[task.id!] ? "line-through" : ""
                      }`}
                    >
                      {task.taskName}
                    </h1>
                    <p>{task.description}</p>
                  </div>
                ) : (
                  <div className="flex flex-col w-full gap-4">
                    <input
                      className="p-4 bg-[#FAFAF9] rounded-lg focus:outline-gray-300"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />

                    <textarea
                      rows={2}
                      className="p-4 bg-[#FAFAF9] rounded-lg focus:outline-gray-300"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    />

                    <button
                      onClick={() => {
                        updateTask(task.id!, {
                          taskName: editName,
                          description: editDesc,
                        });
                        setEditingId(null);
                      }}
                      className="bg-black font-bold text-white py-4 rounded-full"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              {hover && editingId !== task.id && (
                <div className="flex gap-6">
                  <Pencil
                    onClick={() => {
                      setEditingId(task.id!);
                      setEditName(task.taskName);
                      setEditDesc(task.description);
                    }}
                    className="cursor-pointer opacity-30 hover:opacity-100 hover:text-[#7493c2]"
                    size={24}
                  />
                  <Trash
                    onClick={() => deleteTask(task.id!)}
                    className="cursor-pointer opacity-30 hover:opacity-100 hover:text-[#EF4444]"
                    size={24}
                  />
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-black text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-400"
            >
              Previous
            </button>
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="bg-black text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-xl font-light mt-20">No task nyet.</p>
      )}
    </div>
  );
}
