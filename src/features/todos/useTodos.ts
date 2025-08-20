'use client'

import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { todosKeys } from './keys'
import { addTodo, fetchTodos, removeTodo, toggleTodo, type TodoRow } from './api'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export function useTodos(userId: string, q: string) {
    const qc = useQueryClient()
    const supabase = getSupabaseBrowserClient()
    const normQ = q.trim().toLowerCase()
    const list = useQuery({
        queryKey: todosKeys.list(userId, normQ),
        queryFn: () => fetchTodos(normQ),
        staleTime: 15_000,
        keepPreviousData: true,
    })
    const invalidateUserTodos = () =>
        qc.invalidateQueries({ queryKey: ['todos'], exact: false })

    const matchesFilter = (title: string) =>
        !normQ || title.toLowerCase().includes(normQ)
    const add = useMutation({
        mutationFn: (title: string) => addTodo(title),
        onMutate: async (title: string) => {
            await qc.cancelQueries({ queryKey: todosKeys.list(userId, normQ) })
            const prev = qc.getQueryData<TodoRow[]>(todosKeys.list(userId, normQ)) ?? []
            const optimistic: TodoRow | null = matchesFilter(title)
                ? { id: 'opt-' + Date.now(), title, completed: false }
                : null
            if (optimistic) {
                qc.setQueryData<TodoRow[]>(todosKeys.list(userId, normQ), [optimistic, ...prev])
            }
            return { prev, optimisticId: optimistic?.id }
        },
        onError: (_err, _title, ctx) => {
            if (ctx) qc.setQueryData(todosKeys.list(userId, normQ), ctx.prev)
        },
        onSuccess: (created, _title, ctx) => {
            qc.setQueryData<TodoRow[]>(todosKeys.list(userId, normQ), (prev = []) => {
                const filtered = prev.filter((t) => t.id !== ctx?.optimisticId)
                return matchesFilter(created.title) ? [created, ...filtered] : filtered
            })
        },
        onSettled: invalidateUserTodos,
    })
    const toggle = useMutation({
        mutationFn: ({ id, next }: { id: string; next: boolean }) => toggleTodo(id, next),
        onMutate: async ({ id, next }) => {
            await qc.cancelQueries({ queryKey: todosKeys.list(userId, normQ) })
            const prev = qc.getQueryData<TodoRow[]>(todosKeys.list(userId, normQ)) ?? []
            qc.setQueryData<TodoRow[]>(todosKeys.list(userId, normQ),
                prev.map((t) => (t.id === id ? { ...t, completed: next } : t)))
            return { prev }
        },
        onError: (_err, _vars, ctx) => {
            if (ctx) qc.setQueryData(todosKeys.list(userId, normQ), ctx.prev)
        },
        onSuccess: (row) => {
            qc.setQueryData<TodoRow[]>(todosKeys.list(userId, normQ), (prev = []) =>
                matchesFilter(row.title)
                    ? prev.map((t) => (t.id === row.id ? row : t))
                    : prev.filter((t) => t.id !== row.id)
            )
        },
        onSettled: invalidateUserTodos,
    })
    const remove = useMutation({
        mutationFn: (id: string) => removeTodo(id),
        onMutate: async (id: string) => {
            await qc.cancelQueries({ queryKey: todosKeys.list(userId, normQ) })
            const prev = qc.getQueryData<TodoRow[]>(todosKeys.list(userId, normQ)) ?? []
            qc.setQueryData<TodoRow[]>(todosKeys.list(userId, normQ), prev.filter((t) => t.id !== id))
            return { prev }
        },
        onError: (_err, _id, ctx) => {
            if (ctx) qc.setQueryData(todosKeys.list(userId, normQ), ctx.prev)
        },
        onSettled: invalidateUserTodos,
    })
    useEffect(() => {
        const channel = supabase
            .channel('todos-rq-search-sync')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'todos', filter: `user_id=eq.${userId}` },
                (payload) => {
                    qc.setQueryData<TodoRow[]>(todosKeys.list(userId, normQ), (prev = []) => {
                        if (payload.eventType === 'INSERT') {
                            const n = payload.new as any
                            if (!matchesFilter(n.title) || prev.some((t) => t.id === n.id)) return prev
                            return [{ id: n.id, title: n.title, completed: n.completed }, ...prev]
                        }
                        if (payload.eventType === 'UPDATE') {
                            const n = payload.new as any
                            const updated: TodoRow = { id: n.id, title: n.title, completed: n.completed }
                            const inList = prev.some((t) => t.id === n.id)
                            if (matchesFilter(n.title)) {
                                return inList
                                    ? prev.map((t) => (t.id === n.id ? updated : t))
                                    : [updated, ...prev]
                            }
                            return prev.filter((t) => t.id !== n.id)
                        }
                        if (payload.eventType === 'DELETE') {
                            const o = payload.old as any
                            return prev.filter((t) => t.id !== o.id)
                        }
                        return prev
                    })
                }
            )
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [qc, supabase, userId, normQ])

    return { list, add, toggle, remove }
}
