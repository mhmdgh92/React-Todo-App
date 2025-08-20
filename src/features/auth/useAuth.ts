'use client'

import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authKeys } from './keys'
import { fetchUser, signIn, register, signOut } from './api'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { todosKeys } from '@/features/todos/keys'

export function useAuth() {
    const qc = useQueryClient()
    const router = useRouter()
    const supabase = getSupabaseBrowserClient()
    const user = useQuery({
        queryKey: authKeys.user,
        queryFn: fetchUser,
        staleTime: 0,
    })
    const signInM = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => signIn(email, password),
        onSuccess: (u) => {
            qc.setQueryData(authKeys.user, u)
            qc.invalidateQueries({ queryKey: todosKeys?.all ?? ['todos'] })
            router.replace('/todos')
        },
    })

    const registerM = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => register(email, password),
        onSuccess: ({ needsConfirmation }) => {
            qc.invalidateQueries({ queryKey: authKeys.user })
            if (needsConfirmation) {
            } else {
                router.replace('/todos')
            }
        },
    })

    const signOutM = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            qc.setQueryData(authKeys.user, null)
            qc.invalidateQueries({ queryKey: todosKeys?.all ?? ['todos'] })
            router.replace('/')
        },
    })

    useEffect(() => {
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            qc.setQueryData(authKeys.user, session?.user ?? null)
            qc.invalidateQueries({ queryKey: todosKeys?.all ?? ['todos'] })
        })
        return () => sub.subscription.unsubscribe()
    }, [qc, supabase])

    return {
        user,
        signIn: signInM,
        register: registerM,
        signOut: signOutM,
    }
}
