import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Task } from "../types/task";
import { TaskItem } from "./TaskItem";
import { useFilteredTasks } from "../hooks/useFilteredTasks";
import { useTaskStore } from "../store/taskStore";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function SortableTaskItem({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "opacity-50 z-50" : ""}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-400
    flex justify-center py-1"
      >
        ⠿
      </div>
      <TaskItem task={task} />
    </div>
  );
}

export function TaskList() {
  const { tasks } = useFilteredTasks();
  const { tasks: allTasks } = useTaskStore();
  const updateTask = useTaskStore((state) => state.updateTask);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = allTasks.findIndex((t) => t.id === active.id);
    const newIndex = allTasks.findIndex((t) => t.id === over.id);

    const newTasks = arrayMove(allTasks, oldIndex, newIndex);

    newTasks.forEach((task, index) => {
      updateTask(task.id, { ...task });
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 dark:text-gray-500">
        <p className="text-5xl mb-4">📭</p>
        <p className="text-lg font-medium">Задач нет</p>
        <p className="text-sm mt-1">Добавьте первую задачу выше</p>
      </div>
    );

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {tasks.map((task) => (
              <SortableTaskItem key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  }
}
