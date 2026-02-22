import type { Filters, Priority, Task } from "../types/task";

const PRIORITY_WEIGHT: Record<Priority, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export function filterTasks(tasks: Task[], filters: Filters): Task[] {
  return tasks.filter((task) => {
    if (filters.status === "active" && task.completed) return false;
    if (filters.status === "completed" && !task.completed) return false;

    if (filters.priority !== "all" && task.priority !== filters.priority)
      return false;

    if (filters.search) {
      const search = filters.search.toLowerCase();
      if (!task.title.toLowerCase().includes(search)) return false;
    }
    return true;
  });
}

export function sortTasks(tasks: Task[], filters: Filters): Task[] {
  if (filters.sortField === "manual") return tasks;
  return [...tasks].sort((a, b) => {
    if (filters.sortField === "createdAt") {
      return filters.sortBy === "desc"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    if (filters.sortField === "priority") {
      return filters.sortBy === "desc"
        ? PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority]
        : PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
    }

    if (filters.sortField === "title") {
      return filters.sortBy === "desc"
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
    }
    return 0;
  });
}

export function countActiveTasks(tasks: Task[]): number {
  return tasks.filter((tk) => !tk.completed).length;
}
