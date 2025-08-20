'use client'

import { FormEvent, useState } from 'react'
import { useTodos } from '@/features/todos/useTodos'
import { TodoItem } from '@/features/todos'
import { useDebounce } from '@/hooks/useDebounce'

export default function TodosClient({ initialUserId }: { initialUserId: string }) {
    const [title, setTitle] = useState('')
    const [q, setQ] = useState('')
    const dq = useDebounce(q, 300)

    const { list, add, toggle, remove } = useTodos(initialUserId, dq)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const t = title.trim()
        if (!t) return
        add.mutate(t, { onSuccess: () => setTitle('') })
    }

    return (
        <section className="p-5 space-y-6 w-screen h-screen flex flex-col">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold">Your Todos</h2>

                <div className="join w-full sm:w-auto">
                    <input
                        className="input input-bordered join-item w-full sm:w-80"
                        placeholder="Search todos…"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        aria-label="Search todos"
                    />
                    {q ? (
                        <button className="btn join-item btn-ghost" onClick={() => setQ('')}>
                            Clear
                        </button>
                    ) : (
                        <span className="btn join-item btn-ghost" aria-hidden>🔎</span>
                    )}
                </div>
            </div>

            <form onSubmit={onSubmit} className="flex gap-2">
                <input
                    className="input input-bordered w-full"
                    placeholder="Add a new task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    aria-label="New todo title"
                />
                <button type="submit" className="btn btn-primary btn-soft" disabled={add.isPending}>
                    {add.isPending ? 'Adding…' : 'Add'}
                </button>
            </form>

            {list.isLoading ? (
                <div className="skeleton h-12 w-full" />
            ) : list.error ? (
                <div className="alert alert-error">{(list.error as any)?.message ?? 'Failed to load todos'}</div>
            ) : (
                <ul className="divide-y divide-base-300 rounded-xl border border-base-300 bg-base-100">
                    {(!list.data || list.data.length === 0) ? (
                        <li className="p-4 text-base-content/60">No results for “{q}”.</li>
                    ) : (
                        list.data.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onToggle={(id) => toggle.mutate({ id, next: !todo.completed })}
                                onRemove={(id) => remove.mutate(id)}
                            />
                        ))
                    )}
                </ul>
            )}
        </section>
    )
}
