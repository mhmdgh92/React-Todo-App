import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import TodosClient from "./TodosClient"

export default async function TodosPage() {
    const supabase = createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')
    const { id } = user
    return <TodosClient initialUserId={id} />
}
