import { useState } from 'react'
import Header from './components/Header'
import TaskList from './components/TaskList'
import { initialTasks } from './data/initialTasks'
import type { Task } from './types/task'

function App() {
  // Єдине джерело правди: масив завдань живе в App
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

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

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <TaskList tasks={tasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
      </main>
    </div>
  )
}

export default App
