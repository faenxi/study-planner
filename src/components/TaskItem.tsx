import type { Task } from '../types/task'
import { PRIORITY_LABELS } from '../data/labels'
import './TaskItem.scss'

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  // Модифікатор BEM: виконане завдання виглядає інакше
  const itemClassName = task.completed ? 'task-item task-item--completed' : 'task-item'

  return (
    <li className={itemClassName}>
      <div className="task-item__body">
        <h3 className="task-item__title">{task.title}</h3>
        {task.description && <p className="task-item__description">{task.description}</p>}
        <div className="task-item__meta">
          <span className="task-item__category">{task.category}</span>
          <span className={`task-item__priority task-item__priority--${task.priority}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
          <span className="task-item__status">{task.completed ? 'Виконано' : 'Не виконано'}</span>
        </div>
      </div>
      <div className="task-item__actions">
        <button type="button" className="button button--secondary button--small" onClick={() => onToggle(task.id)}>
          {task.completed ? 'Повернути' : 'Виконано'}
        </button>
        <button
          type="button"
          className="button button--danger button--small"
          aria-label={`Видалити завдання «${task.title}»`}
          onClick={() => onDelete(task.id)}
        >
          Видалити
        </button>
      </div>
    </li>
  )
}

export default TaskItem
