import type { Priority, TaskFilter } from '../types/task'

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Низький',
  medium: 'Середній',
  high: 'Високий',
}

export const FILTER_LABELS: Record<TaskFilter, string> = {
  all: 'Всі',
  completed: 'Виконані',
  active: 'Не виконані',
}

/** Порядок кнопок у компоненті TaskFilters. */
export const FILTERS: TaskFilter[] = ['all', 'completed', 'active']
