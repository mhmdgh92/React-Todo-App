import { getSupabaseBrowserClient } from '@/lib/supabase/client'
export type TodoRow = { id: string; title: string; completed: boolean }

const supabase = getSupabaseBrowserClient()

export async function fetchTodos(q: string): Promise<TodoRow[]> {
    let query = supabase
        .from('todos')
        .select('id, title, completed')
        .order('inserted_at', { ascending: false })

    if (q) {
        query = query.ilike('title', `%${q}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data ?? []
}

export async function addTodo(title: string): Promise<TodoRow> {
    const { data, error } = await supabase
        .from('todos')
        .insert([{ title }])
        .select('id, title, completed')
        .single()
    if (error) throw error
    return data!
}

export async function toggleTodo(id: string, completed: boolean): Promise<TodoRow> {
    const { data, error } = await supabase
        .from('todos')
        .update({ completed })
        .eq('id', id)
        .select('id, title, completed')
        .single()
    if (error) throw error
    return data!
}

export async function removeTodo(id: string): Promise<void> {
    const { error } = await supabase.from('todos').delete().eq('id', id)
    if (error) throw error
}
