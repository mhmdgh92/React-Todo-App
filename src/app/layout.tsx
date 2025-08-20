import '@/styles/globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import AuthListener from '@/components/auth/AuthListener'
import NavAuthClient from '@/components/auth/NavAuthClient'
import Providers from './providers'
import type { Viewport } from 'next'
export const viewport: Viewport = { width: 'device-width', initialScale: 1 }

export const metadata: Metadata = {
    title: 'TodoApp',
    description: 'Next.js + Supabase + React Query Todo App',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en" data-theme="light">
            <Providers>
                <body className="min-h-screen">
                    <AuthListener />
                    <header className="navbar border-b border-b-gray-200">
                        <div className="container">
                            <Link href="/" className="text-lg font-bold">TodoApp</Link>

                            {/* Mobile menu */}
                            <div className="flex-none md:hidden mt-5">
                                <div className="dropdown">
                                    <button tabIndex={0} className="btn btn-ghost text-2xl" aria-label="Open menu">☰</button>
                                    <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-70">
                                        <li><Link href="/">Home</Link></li>
                                        <li><Link href="/about">About</Link></li>
                                        <li className="mt-2 border-t pt-2"><NavAuthClient /></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Desktop menu */}
                            <nav className="hidden md:flex items-center gap-2 mt-5">
                                <Link href="/" className="btn btn-soft btn-natural">Home</Link>
                                <Link href="/about" className="btn btn-soft btn-info">About</Link>
                                <NavAuthClient />
                            </nav>
                        </div>
                    </header>
                    <main className="container">
                        {children}
                    </main>
                </body>
            </Providers>
        </html>
    )
}
