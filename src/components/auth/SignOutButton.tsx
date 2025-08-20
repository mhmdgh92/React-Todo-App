'use client'

import { useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export default function SignOutButton() {
    const router = useRouter()
    const supabase = getSupabaseBrowserClient()

    const onSignOut = async () => {
        await supabase.auth.signOut()
        router.replace('/')
    }

    return (
        <button className="btn btn-secondary btn-soft" onClick={onSignOut}>
            Sign out
        </button>
    )
}
