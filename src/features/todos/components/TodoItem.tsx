import clsx from 'clsx'
import type { Todo } from '../types'

type Props = {
    todo: Todo
    onToggle: (id: string) => void
    onRemove: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onRemove }: Props) {
    const { id, title, completed } = todo;
    return (
        <li className="flex items-center justify-between p-3">
            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={completed}
                    onChange={() => onToggle(id)}
                    aria-label={`Toggle ${title}`}
                />
                <span
                    className={clsx(
                        'leading-6',
                        completed && 'line-through text-base-content/50'
                    )}
                >
                    {title}
                </span>
            </label>

            <button
                type="button"
                className="btn btn-error btn-soft btn-sm"
                onClick={() => onRemove(id)}
                aria-label={`Remove ${title}`}
            >
                Remove
            </button>
        </li>
    )
}
