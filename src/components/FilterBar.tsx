import { useTaskStore } from "../store/taskStore";
import { useFilteredTasks } from "../hooks/useFilteredTasks";

function FilterBar() {
  const setFilters = useTaskStore((state) => state.setFilters);
  const resetFilters = useTaskStore((state) => state.resetFilters);

  const { filters, activeCount, totalCount } = useFilteredTasks();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 space-y-4">
      <div className="flex items-center justify-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          📋 My Tasks
        </h2>
        <div className="flex gap-2 text-sm">
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-100 rounded-full font-medium">
            Active: {activeCount}
          </span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium">
            Total: {totalCount}
          </span>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search by title"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
      />{" "}
      <div className="flex flex-wrap gap-3">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value as any })}
          className="flex-1  px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all"> All tasks</option>
          <option value="active"> Active</option>
          <option value="completed"> Completed</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value as any })}
          className="flex-1  px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all"> All priorities</option>
          <option value="low"> 🟢 Low</option>
          <option value="medium"> 🟡 Meduim</option>
          <option value="high"> 🔴 High</option>
        </select>
        <select
          value={filters.sortField}
          onChange={(e) => setFilters({ sortField: e.target.value as any })}
          className="flex-1  px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="createdAt"> By date</option>
          <option value="priority"> By priority</option>
          <option value="title"> By title</option>
        </select>
        <button
          onClick={() =>
            setFilters({
              sortBy: filters.sortBy === "asc" ? "desc" : "asc",
            })
          }
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          {filters.sortBy === "asc" ? "By ascending" : "By descending"}
        </button>
        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors font-medium"
        >
          Default filters
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
