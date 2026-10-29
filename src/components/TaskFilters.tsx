import type { TaskFilter } from '../types/task'
import { FILTERS, FILTER_LABELS } from '../data/labels'
import './TaskFilters.scss'

interface TaskFiltersProps {
  filter: TaskFilter
  onFilterChange: (filter: TaskFilter) => void
}

function TaskFilters({ filter, onFilterChange }: TaskFiltersProps) {
  return (
    <div className="task-filters" role="group" aria-label="Фільтр завдань">
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
            {FILTER_LABELS[option]}
          </button>
        )
      })}
    </div>
  )
}

export default TaskFilters
