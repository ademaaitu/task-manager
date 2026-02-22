import { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import type { Priority, Task } from "../types/task";
import { BiEdit, BiTrash } from "react-icons/bi";
interface TaskItemProps {
  task: Task;
}

const PRIORITY_CONFIG: Record<Priority, { label: string; classes: string }> = {
  low: {
    label: "Low",
    classes:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  medium: {
    label: "Medium",
    classes:
      "bg-red-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  },
  high: {
    label: "High",
    classes: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
};

export function TaskItem({ task }: TaskItemProps) {
  const { deleteTask, updateTask, toggleTask } = useTaskStore();

  const [isEditing, setIsEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description ?? "",
  );
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);

  const handleDelete = () => {
    if (window.confirm(`Dalaete task "${task.title}"`)) {
      deleteTask(task.id);
    }
  };
  const handleSave = () => {
    if (!editTitle.trim()) return;
    updateTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
    setEditPriority(task.priority);
    setIsEditing(false);
  };
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5
            border border-gray-100 dark:border-gray-700
            animate-slide-up transition-all duration-200
            ${task.completed ? "opacity-60" : "opacity-100"}`}
    >
      {!isEditing ? (
        <div>
          <div className="flex items-start gap3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mt-1 w-4 h-4 accent-primary-500 cursor-pointer mr-4"
            />
            <div className="flex-1 min w-0">
              <p
                className={`font-semibold text-gray-800 dark:text-white ${task.completed ? "line-through text-gray-400" : ""} `}
              >
                {task.title}
              </p>
              {task.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${priorityConfig.classes}`}
                >
                  {priorityConfig.label}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {new Date(task.createdAt).toLocaleDateString("ru-Ru")}
                </span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg text-gray-400 
              hover:text-primary-500 hover:bg-primary-50
               dark:hover:bg-gray-700 transition-colors"
              >
                <BiEdit />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg text-gray-400 
              hover:text-red-500 hover:bg-red-50
               dark:hover:bg-gray-700 transition-colors"
              >
                <BiTrash />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg 
        border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
        focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg 
        border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
        focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Priority)}
            className="w-full px-4 py-2 rounded-lg 
        border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
        focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="high">High priority</option>
            <option value="medium">Medium priority</option>
            <option value="low">Low priority</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg 
            font-medium hover:bg-gray-200 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg 
            font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
