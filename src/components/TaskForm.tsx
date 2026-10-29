import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { PRIORITIES } from '../types/task'
import type { NewTask, Priority } from '../types/task'
import { PRIORITY_LABELS } from '../data/labels'

interface TaskFormProps {
  onAddTask: (task: NewTask) => void
}

interface FormValues {
  title: string
  description: string
  category: string
  priority: Priority
}

const emptyValues: FormValues = {
  title: '',
  description: '',
  category: '',
  priority: 'medium',
}

const DEFAULT_CATEGORY = 'Загальне'

function isPriority(value: string): value is Priority {
  return (PRIORITIES as readonly string[]).includes(value)
}

function TaskForm({ onAddTask }: TaskFormProps) {
  // Керована форма: значення полів зберігаються в state
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [titleError, setTitleError] = useState<string | null>(null)

  const formId = useId()
  const titleId = `${formId}-title`
  const titleErrorId = `${formId}-title-error`
  const descriptionId = `${formId}-description`
  const categoryId = `${formId}-category`
  const priorityId = `${formId}-priority`

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Не даємо браузеру перезавантажити сторінку
    event.preventDefault()

    const title = values.title.trim()

    // Проста валідація: назва обов'язкова
    if (title === '') {
      setTitleError('Введіть назву завдання.')
      return
    }

    onAddTask({
      title,
      description: values.description.trim(),
      category: values.category.trim() || DEFAULT_CATEGORY,
      priority: values.priority,
    })

    // Після успішного додавання очищаємо форму
    setValues(emptyValues)
    setTitleError(null)
  }

  function handlePriorityChange(value: string) {
    if (isPriority(value)) {
      setValues((prevValues) => ({ ...prevValues, priority: value }))
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h2 className="task-form__title">Нове завдання</h2>

      <div className="task-form__field task-form__field--wide">
        <label className="task-form__label" htmlFor={titleId}>
          Назва *
        </label>
        <input
          id={titleId}
          className={titleError ? 'task-form__input task-form__input--invalid' : 'task-form__input'}
          type="text"
          value={values.title}
          placeholder="Наприклад, прочитати розділ про props"
          aria-invalid={titleError !== null}
          aria-describedby={titleError ? titleErrorId : undefined}
          onChange={(event) => {
            const title = event.target.value
            setValues((prevValues) => ({ ...prevValues, title }))
            // Прибираємо помилку, щойно користувач почав виправляти поле
            setTitleError(null)
          }}
        />
        {titleError && (
          <p id={titleErrorId} className="task-form__error" role="alert">
            {titleError}
          </p>
        )}
      </div>

      <div className="task-form__field task-form__field--wide">
        <label className="task-form__label" htmlFor={descriptionId}>
          Опис
        </label>
        <textarea
          id={descriptionId}
          className="task-form__input task-form__input--textarea"
          rows={3}
          value={values.description}
          placeholder="Короткий опис завдання"
          onChange={(event) => {
            const description = event.target.value
            setValues((prevValues) => ({ ...prevValues, description }))
          }}
        />
      </div>

      <div className="task-form__field">
        <label className="task-form__label" htmlFor={categoryId}>
          Категорія
        </label>
        <input
          id={categoryId}
          className="task-form__input"
          type="text"
          value={values.category}
          placeholder={DEFAULT_CATEGORY}
          onChange={(event) => {
            const category = event.target.value
            setValues((prevValues) => ({ ...prevValues, category }))
          }}
        />
      </div>

      <div className="task-form__field">
        <label className="task-form__label" htmlFor={priorityId}>
          Пріоритет
        </label>
        <select
          id={priorityId}
          className="task-form__input"
          value={values.priority}
          onChange={(event) => handlePriorityChange(event.target.value)}
        >
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {PRIORITY_LABELS[priority]}
            </option>
          ))}
        </select>
      </div>

      <div className="task-form__actions">
        <button type="submit" className="button button--primary">
          Додати
        </button>
      </div>
    </form>
  )
}

export default TaskForm
