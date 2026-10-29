import type { Task } from '../types/task'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
}

function TaskList({ tasks }: TaskListProps) {
  // Умовний рендеринг: повідомлення для порожнього списку
  if (tasks.length === 0) {
    return (
      <div className="task-list task-list--empty">
        <p className="task-list__message">Завдань поки немає.</p>
        <p className="task-list__hint">Додайте перше навчальне завдання.</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // key має бути стабільним і унікальним, тому використовуємо id, а не індекс
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}

export default TaskList
