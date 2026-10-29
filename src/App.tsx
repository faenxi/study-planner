import { useState } from 'react'
import Header from './components/Header'
import TaskFilters from './components/TaskFilters'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskStats from './components/TaskStats'
import { initialTasks } from './data/initialTasks'
import type { NewTask, Task, TaskFilter } from './types/task'
import './App.scss'

function matchesFilter(task: Task, filter: TaskFilter): boolean {
  switch (filter) {
    case 'completed':
      return task.completed
    case 'active':
      return !task.completed
    default:
      return true
  }
}

function App() {
  // Єдине джерело правди: масив завдань живе в App
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<TaskFilter>('all')

  // Фільтр змінює лише те, що показується. Вихідний масив tasks залишається без змін.
  const visibleTasks = tasks.filter((task) => matchesFilter(task, filter))

  // Лічильники для кнопок фільтра теж похідні дані, окремий state не потрібен
  const counts: Record<TaskFilter, number> = {
    all: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    active: tasks.filter((task) => !task.completed).length,
  }

  // Immutable update: створюємо НОВИЙ масив, а не викликаємо push у старому.
  // id обчислюється всередині updater-функції, тому завжди спирається на актуальний масив.
  function handleAddTask(newTask: NewTask) {
    setTasks((prevTasks) => {
      const nextId = prevTasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1
      return [...prevTasks, { ...newTask, id: nextId, completed: false }]
    })
  }

  // Immutable update: map повертає НОВИЙ масив, змінений елемент копіюється через spread
  function handleToggleTask(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    )
  }

  // Immutable update: filter повертає НОВИЙ масив без видаленого завдання
  function handleDeleteTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  // Immutable update: залишаємо лише невиконані завдання
  function handleClearCompleted() {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed))
  }

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <TaskForm onAddTask={handleAddTask} />
        <TaskStats tasks={tasks} />
        <section className="app__tasks">
          <TaskFilters
            filter={filter}
            counts={counts}
            onFilterChange={setFilter}
            onClearCompleted={handleClearCompleted}
          />
          <TaskList
            tasks={visibleTasks}
            hasAnyTasks={tasks.length > 0}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        </section>
      </main>
    </div>
  )
}

export default App
