import type { TaskFilter } from '../types/task'
import { FILTERS, FILTER_LABELS } from '../data/labels'
import './TaskFilters.scss'

interface TaskFiltersProps {
  filter: TaskFilter
  /** Кількість завдань для кожного фільтра: показується у кнопках. */
  counts: Record<TaskFilter, number>
  onFilterChange: (filter: TaskFilter) => void
  onClearCompleted: () => void
}

function TaskFilters({ filter, counts, onFilterChange, onClearCompleted }: TaskFiltersProps) {
  return (
    <div className="task-filters">
      <div className="task-filters__group" role="group" aria-label="Фільтр завдань">
        {FILTERS.map((option) => {
          const isActive = option === filter

          return (
            <button
              key={option}
              type="button"
              className={isActive ? 'task-filters__button task-filters__button--active' : 'task-filters__button'}
              aria-pressed={isActive}
              onClick={() => onFilterChange(option)}
            >
              {FILTER_LABELS[option]} ({counts[option]})
            </button>
          )
        })}
      </div>

      {/* Умовний рендеринг: кнопка потрібна лише тоді, коли є що очищати */}
      {counts.completed > 0 && (
        <button type="button" className="button button--secondary button--small" onClick={onClearCompleted}>
          Очистити виконані
        </button>
      )}
    </div>
  )
}

export default TaskFilters
