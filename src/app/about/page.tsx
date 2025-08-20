export default function AboutPage() {
    return (
        <section className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">About</h2>

            <div className="card rounded-xl border border-base-300 bg-base-100">
                <div className="card-body p-5 sm:p-6">
                    <p className="text-base-content/80">
                        This app uses Next.js (App Router), and Supabase (Auth + DB).
                        <br /> Tailwind and Daisy for stying.
                        <br />React Query for data fetching and caching.
                    </p>
                    <p className='text-lg font-semibold mt-6'>Developed by MhmdGH</p>
                    <p className='text-lg font-semibold '>mohammedghabyen@gmail.com</p>
                </div>
            </div>
        </section>
    )
}