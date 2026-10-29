import type { Task } from '../types/task'
import TaskItem from './TaskItem'
import './TaskList.scss'

interface TaskListProps {
  /** Завдання, які треба показати (вже відфільтровані). */
  tasks: Task[]
  /** Чи є взагалі завдання у застосунку, незалежно від фільтра. */
  hasAnyTasks: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TaskList({ tasks, hasAnyTasks, onToggle, onDelete }: TaskListProps) {
  // Умовний рендеринг: два різні повідомлення для порожнього стану
  if (!hasAnyTasks) {
    return (
      <div className="task-list task-list--empty">
        <p className="task-list__message">Завдань поки немає.</p>
        <p className="task-list__hint">Додайте перше навчальне завдання.</p>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list task-list--empty">
        <p className="task-list__message">За цим фільтром завдань немає.</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // key має бути стабільним і унікальним, тому використовуємо id, а не індекс
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default TaskList
