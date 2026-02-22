import { create } from "zustand";
import type { Filters, Task } from "../types/task";
import { persist } from "zustand/middleware";

const defaultFilters: Filters = {
  status: "all",
  priority: "all",
  search: "",
  sortField: "createdAt",
  sortBy: "desc",
};
interface TaskStore {
  tasks: Task[];
  filters: Filters;

  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  toggleTask: (id: string) => void;

  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      filters: defaultFilters,

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: crypto.randomUUID(),
              createdAt: new Date(),
            },
          ],
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((tk) => tk.id !== id),
        })),

      updateTask: (id, data) =>
        set((state) => ({
          tasks: state.tasks.map((tk) =>
            tk.id === id ? { ...tk, ...data } : tk,
          ),
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((tk) =>
            tk.id === id ? { ...tk, completed: !tk.completed } : tk,
          ),
        })),
        
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),
      resetFilters: () => set({ filters: defaultFilters }),
    }),
    { name: "task-storage" },
  ),
);
