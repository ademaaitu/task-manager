import { useTaskStore } from "../store/taskStore";
import { countActiveTasks, filterTasks, sortTasks } from "../utils/helpers";

export function useFilteredTasks() {
  const tasks = useTaskStore((state) => state.tasks);
  const filters = useTaskStore((state) => state.filters);

  const filtered = filterTasks(tasks, filters);
  const sorted = sortTasks(tasks, filters);
  const activeCount = countActiveTasks(tasks);

  return {
    tasks: sorted,
    filters,
    activeCount,
    filtered,
    totalCount: tasks.length,
  };
}
