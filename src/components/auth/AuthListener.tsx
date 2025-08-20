"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export default function AuthListener() {
    const router = useRouter()

    useEffect(() => {
        const supabase = getSupabaseBrowserClient()
        const { data: sub } = supabase.auth.onAuthStateChange(() => {
            router.refresh()
        })
        return () => { sub.subscription.unsubscribe() }
    }, [router])

    return null
}
