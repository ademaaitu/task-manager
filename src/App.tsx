import FilterBar from "./components/FilterBar";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header
        className="bg-white dark:bg-gray-800 shadow-sm
      border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Task Manager
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your tasks
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <TaskForm />
        <FilterBar />
        <TaskList />
      </main>
      <footer className="text-center py-6 text-sm text-gray-400 dark:text-gray-600"></footer>
    </div>
  );
}
