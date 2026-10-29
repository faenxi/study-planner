import type { Task } from '../types/task'

interface TaskStatsProps {
  tasks: Task[]
}

function TaskStats({ tasks }: TaskStatsProps) {
  // Похідні дані: рахуємо з поточного масиву при кожному рендері, окремий state не потрібен.
  // Тому статистика оновлюється автоматично після додавання, видалення чи зміни завдання.
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const active = tasks.filter((task) => !task.completed).length

  return (
    <dl className="task-stats">
      <div className="task-stats__item">
        <dt className="task-stats__label">Всього</dt>
        <dd className="task-stats__value">{total}</dd>
      </div>
      <div className="task-stats__item task-stats__item--completed">
        <dt className="task-stats__label">Виконано</dt>
        <dd className="task-stats__value">{completed}</dd>
      </div>
      <div className="task-stats__item task-stats__item--active">
        <dt className="task-stats__label">Не виконано</dt>
        <dd className="task-stats__value">{active}</dd>
      </div>
    </dl>
  )
}

export default TaskStats
