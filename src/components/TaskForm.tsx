import z from "zod";
import { useTaskStore } from "../store/taskStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Priority } from "../types/task";

const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title required")
    .max(20, "The title must not exceed 20 characters"),
  description: z
    .string()
    .max(500, "The description must not exceed 500 characters")
    .optional(),
  priority: z.enum(["low", "medium", "high"]),
});
type TaskFormData = z.infer<typeof taskSchema>;

export function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: "high",
    },
  });

  const onSubmit = (data: TaskFormData) => {
    addTask({
      title: data.title,
      description: data.description,
      priority: data.priority as Priority,
      completed: false,
    });
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-fade-in border border-gray-100 dark:border-gray-700"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        New task
      </h2>
      <div className="mb-4">
        <input
          {...register("title")}
          placeholder="Task title"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {errors.title && (
          <p className="text-brown-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          {...register("description")}
          placeholder="Task description(not required)"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
        {errors.description && (
          <p className="text-brown-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <select
          {...register("priority")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="high">
             High priority
          </option>
          <option value="medium">
             Medium priority
          </option>
          <option value="low">
            Low priority
          </option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 
      text-white font-semibold rounded-lg transition-colors duration-200"
      >
        Submit task
      </button>
    </form>
  );
}
