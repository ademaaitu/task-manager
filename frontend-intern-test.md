# Тестовое задание для стажёра Frontend-разработчика

## Описание проекта

Необходимо создать веб-приложение "Менеджер задач" с возможностью добавления, редактирования, удаления и фильтрации задач.

## Технические требования

### Обязательные технологии:
- **React** (v18+)
- **TypeScript** - весь код должен быть типизирован
- **Zustand** - для управления состоянием приложения
- **Tailwind CSS** - для стилизации компонентов
- **Vite** - в качестве сборщика (рекомендуется)

### Дополнительно (будет плюсом):
- React Hook Form для работы с формами
- Zod для валидации данных
- React DnD или @dnd-kit для drag-and-drop
- Prettier и ESLint для форматирования кода

## Функциональные требования

### Основной функционал:

1. **Добавление задачи**
   - Поле для ввода названия задачи (обязательное)
   - Поле для ввода описания (необязательное)
   - Выбор приоритета (низкий, средний, высокий)
   - Кнопка "Добавить"

2. **Список задач**
   - Отображение всех добавленных задач
   - Каждая задача показывает: название, описание, приоритет, статус
   - Возможность отметить задачу как выполненную (checkbox)

3. **Редактирование задачи**
   - Возможность изменить название, описание и приоритет
   - Сохранение изменений

4. **Удаление задачи**
   - Кнопка удаления для каждой задачи
   - Подтверждение удаления (alert или модальное окно)

5. **Фильтрация**
   - Фильтр по статусу: все / активные / завершённые
   - Фильтр по приоритету

6. **Счётчик задач**
   - Отображение количества активных задач

### Дополнительный функционал (необязательно, но будет плюсом):
- Поиск по названию задачи
- Сортировка задач (по дате создания, приоритету, названию)
- Сохранение задач в LocalStorage
- Drag-and-drop для изменения порядка задач
- Темная/светлая тема
- Адаптивный дизайн для мобильных устройств

## Требования к коду

1. **Архитектура**
   - Компонентный подход
   - Разделение на переиспользуемые компоненты
   - Чистая структура папок

2. **TypeScript**
   - Все компоненты и функции должны быть типизированы
   - Создать интерфейсы для Task, FilterType, Priority и др.
   - Избегать использования `any`

3. **Zustand**
   - Создать store для управления задачами
   - Реализовать actions: addTask, deleteTask, updateTask, toggleTask
   - Использовать selectors для получения отфильтрованных данных

4. **Tailwind CSS**
   - Использовать utility-классы Tailwind
   - Создать переиспользуемые компоненты с props для стилизации
   - Реализовать адаптивный дизайн (sm, md, lg breakpoints)

5. **Качество кода**
   - Читаемый и понятный код
   - Осмысленные названия переменных и функций
   - Комментарии в сложных местах
   - Consistent code style

6. **Git**
   - Использование Git для версионирования
   - Понятные commit-сообщения (conventional commits приветствуются)
   - README.md с инструкцией по запуску

## Примерная структура проекта

```
src/
├── components/
│   ├── TaskList.tsx
│   ├── TaskItem.tsx
│   ├── TaskForm.tsx
│   └── FilterBar.tsx
├── store/
│   └── taskStore.ts
├── types/
│   └── task.ts
├── utils/
│   └── helpers.ts
├── App.tsx
└── main.tsx
```

## Примеры кода (reference)

### TypeScript интерфейсы:
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'active' | 'completed';
```

### Zustand store:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  toggleTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, {
          ...task,
          id: crypto.randomUUID(),
          createdAt: new Date()
        }]
      })),
      // ... остальные actions
    }),
    { name: 'task-storage' }
  )
);
```

## Требования к оформлению

1. **Дизайн**
   - Чистый и понятный интерфейс
   - Логичное расположение элементов
   - Приятная цветовая схема

2. **UX**
   - Валидация форм
   - Понятные сообщения об ошибках
   - Обратная связь при действиях пользователя

## Формат сдачи

1. **Разместить код в публичном репозитории на GitHub**

2. **Добавить README.md с:**
   - Описанием проекта
   - Инструкцией по установке и запуску локально
   - Списком использованных технологий
   - Ссылкой на развернутое приложение на GitHub Pages
   - Скриншотами интерфейса

3. **ОБЯЗАТЕЛЬНО: Развернуть приложение на GitHub Pages**
   - Настроить GitHub Actions для автоматического деплоя (опционально)
   - Приложение должно быть доступно по ссылке вида: `https://username.github.io/project-name`

4. **Прислать ссылку на:**
   - Репозиторий на GitHub
   - Работающее приложение на GitHub Pages

### Инструкция по деплою на GitHub Pages:

```bash
# Установить gh-pages
npm install --save-dev gh-pages

# Добавить в package.json
"homepage": "https://username.github.io/repository-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Деплой
npm run deploy
```

> **Важно:** В `vite.config.ts` укажите `base: '/repository-name/'` для корректной работы на GitHub Pages

## Время выполнения

**Рекомендуемое время:** 3-5 дней

## Быстрый старт (для справки)

### Создание проекта:
```bash
# Создать Vite + React + TypeScript проект
npm create vite@latest my-task-manager -- --template react-ts
cd my-task-manager

# Установить зависимости
npm install

# Установить Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Установить Zustand
npm install zustand

# Установить дополнительные библиотеки (опционально)
npm install react-hook-form zod @hookform/resolvers
```

### Настройка Tailwind (tailwind.config.js):
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Добавить в src/index.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

**Желаем удачи!** 🚀

Не стесняйтесь проявить креативность и добавить свои идеи для улучшения приложения.
