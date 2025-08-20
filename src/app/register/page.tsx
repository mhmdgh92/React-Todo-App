import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import AuthForm from '@/components/auth/AuthForm'

export default async function RegisterPage() {
    const supabase = createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) redirect('/todos')

    return (
        <section className="w-screen h-screen flex flex-col items-center gap-6 py-12">
            <h1 className="text-3xl font-bold">Create account</h1>
            <AuthForm mode="register" />
        </section>
    )
}
