'use client'
import { useState, FormEvent } from 'react'
import { useAuth } from '@/features/auth/useAuth'

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
    const { signIn, register } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [info, setInfo] = useState<string | null>(null)

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setInfo(null)

        if (mode === 'login') {
            signIn.mutate({ email, password })
            return
        }

        register.mutate(
            { email, password },
            {
                onSuccess: ({ needsConfirmation }) => {
                    if (needsConfirmation) setInfo('Check your inbox to confirm your email, then log in.')
                },
            }
        )
    }

    const isPending = signIn.isPending || register.isPending
    const err = (signIn.error as any)?.message || (register.error as any)?.message

    return (
        <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="input input-bordered w-full mt-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="input input-bordered w-full mt-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
            </div>

            {err && <div className="alert alert-error">{err}</div>}
            {info && <div className="alert alert-info">{info}</div>}
            <button type="submit" className="btn btn-primary btn-soft w-full" disabled={isPending}>
                {isPending ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
            </button>
        </form>
    )
}
