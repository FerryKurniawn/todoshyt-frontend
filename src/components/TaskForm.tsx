import React from "react";
import { UseFormReturn } from "react-hook-form";
import { TaskSchema } from "@/lib/taskSchema";

interface TaskFormProps {
  form: UseFormReturn<TaskSchema>;
  addTask: (values: TaskSchema) => Promise<void> | void;
}

const TaskForm: React.FC<TaskFormProps> = ({ form, addTask }) => {
  return (
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
          Description
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
  );
};

export default TaskForm;
