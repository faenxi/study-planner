export const PRIORITIES = ['low', 'medium', 'high'] as const

export type Priority = (typeof PRIORITIES)[number]

export type TaskFilter = 'all' | 'completed' | 'active'

export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  priority: Priority
  category: string
}

/** Дані, які користувач вводить у формі (id та completed додає застосунок). */
export type NewTask = Omit<Task, 'id' | 'completed'>
