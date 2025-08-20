'use client'
import Link from 'next/link'
import { useAuth } from '@/features/auth/useAuth'
import SignOutButton from '@/components/auth/SignOutButton' // or inline

export default function NavAuthClient() {
    const { user, signOut } = useAuth()

    if (user.isLoading) return <div className="skeleton h-10 w-40" />

    if (!user.data) {
        return (
            <div className="flex items-center gap-2">
                <Link href="/login" className="btn btn-soft btn-success">Log in</Link>
                <Link href="/register" className="btn btn-primary btn-soft">Sign up</Link>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-3 w-fit">
            <span className="hidden text-sm text-base-content/70 sm:inline">{user.data.email}</span>
            <button className="btn btn-soft btn-error" onClick={() => signOut.mutate()} disabled={signOut.isPending}>
                {signOut.isPending ? 'Signing out…' : 'Sign out'}
            </button>
        </div>
    )
}
