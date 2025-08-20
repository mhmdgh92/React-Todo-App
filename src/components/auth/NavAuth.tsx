export const dynamic = 'force-dynamic'
import Link from 'next/link'
import SignOutButton from './SignOutButton'
import { NavAuthProps } from '@/types/types'



export default async function NavAuth({ user }: NavAuthProps) {

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Link href="/login" className="btn btn-soft btn-accent">Log in</Link>
                <Link href="/register" className="btn btn-primary btn-soft">Sign up</Link>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-base-content/70 hidden sm:inline">
                {user.email}
            </span>
            <SignOutButton />
        </div>
    )
}