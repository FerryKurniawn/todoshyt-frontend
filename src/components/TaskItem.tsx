import { useState } from "react";
import { Pencil, Trash } from "lucide-react";

export default function TaskItem({
  task,
  checked,
  setChecked,
  editingId,
  setEditingId,
  deleteTask,
  updateTask,
}: any) {
  const [hover, setHover] = useState(false);
  const [editName, setEditName] = useState(task.taskName);
  const [editDesc, setEditDesc] = useState(task.description);

  const isEditing = editingId === task.id;

  return (
    <div
      className={`flex gap-4 shadow-md bg-white mt-6 md:w-[1000px] rounded-xl p-6 hover:shadow-lg justify-between transition-all ${
        checked[task.id] ? "opacity-50" : "opacity-100"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex gap-4 w-full">
        {!isEditing && (
          <input
            type="checkbox"
            className="scale-130 mt-2"
            checked={checked[task.id] || false}
            onChange={() =>
              setChecked((prev: Record<number, boolean>) => ({
                ...prev,
                [task.id]: !prev[task.id],
              }))
            }
          />
        )}

        {!isEditing ? (
          <div>
            <h1
              className={`font-bold text-2xl ${
                checked[task.id] ? "line-through" : ""
              }`}
            >
              {task.taskName}
            </h1>
            <p>{task.description}</p>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-4">
            <input
              className="p-4 bg-[#FAFAF9] rounded-lg"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <textarea
              rows={2}
              className="p-4 bg-[#FAFAF9] rounded-lg"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />

            <button
              onClick={() => {
                updateTask(task.id, {
                  taskName: editName,
                  description: editDesc,
                });
                setEditingId(null);
              }}
              className="bg-black text-white font-bold py-4 rounded-full"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {hover && !isEditing && (
        <div className="flex gap-6">
          <Pencil
            onClick={() => setEditingId(task.id)}
            className="cursor-pointer opacity-30 hover:opacity-100 hover:text-[#7493c2]"
            size={24}
          />
          <Trash
            onClick={() => deleteTask(task.id)}
            className="cursor-pointer opacity-30 hover:opacity-100 hover:text-[#EF4444]"
            size={24}
          />
        </div>
      )}
    </div>
  );
}
