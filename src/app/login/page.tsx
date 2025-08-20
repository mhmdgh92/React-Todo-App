import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import AuthForm from '@/components/auth/AuthForm'

export default async function LoginPage() {
    const supabase = createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) redirect('/todos')

    return (
        <section className='w-screen h-screen flex flex-col items-center  p-18'>
            <h1 className="text-3xl font-bold">Log in</h1>
            <AuthForm mode="login" />
        </section>
    )
}
