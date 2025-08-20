import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const supabase = getSupabaseBrowserClient()

export async function fetchUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
        if ((error as any).status === 401) return null
        throw error
    }
    return data.user
}

export async function signIn(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
    if (error) throw error
    return data.user!
}

export async function register(email: string, password: string): Promise<{ user: User | null; needsConfirmation: boolean }> {
    const { data, error } = await supabase.auth.signUp({ email: email.trim().toLowerCase(), password })
    if (error) {
        if ((error.status === 400 || error.status === 409) && /already (registered|exists)/i.test(error.message)) {
            throw new Error('This email is already registered. Try logging in instead.')
        }
        if (error.status === 429) throw new Error('Too many requests. Please try again later.')
        throw error
    }
    const identities = (data?.user as any)?.identities as unknown[] | undefined
    const alreadyExists = Array.isArray(identities) && identities.length === 0
    if (alreadyExists) return { user: null, needsConfirmation: false }
    return { user: data.user ?? null, needsConfirmation: !data.session }
}

export async function signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}
