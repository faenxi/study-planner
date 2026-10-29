import { useState } from 'react'
import Header from './components/Header'
import TaskList from './components/TaskList'
import { initialTasks } from './data/initialTasks'
import type { Task } from './types/task'

function App() {
  // Єдине джерело правди: масив завдань живе в App
  const [tasks] = useState<Task[]>(initialTasks)

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <TaskList tasks={tasks} />
      </main>
    </div>
  )
}

export default App
