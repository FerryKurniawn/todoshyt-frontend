import { useState } from "react";
import TaskItem from "./TaskItem";
import Pagination from "./Pagination";
import { Task } from "./types";

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: number) => void;
  updateTask: (id: number, title: string) => void;
}

export default function TaskList({
  tasks,
  deleteTask,
  updateTask,
}: TaskListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const tasksPerPage = 5;

  const reversed = tasks.slice().reverse();
  const totalPages = Math.ceil(reversed.length / tasksPerPage);

  const pageTasks = reversed.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  return (
    <div className="flex flex-col p-16">
      {pageTasks.map((task: Task) => (
        <TaskItem
          key={task.id}
          task={task}
          checked={checked}
          setChecked={setChecked}
          editingId={editingId}
          setEditingId={setEditingId}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      />
    </div>
  );
}
