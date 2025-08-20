import Link from 'next/link'

export default function Page() {
    return (
        <section className='w-screen h-screen flex flex-col items-center  p-18 text-center'>
            <p className='text-3xl font-bold mb-6'>Welcome to the TodoApp</p>
            <p className='text-xl font-bold mb-10'>Developed by MhmdGH</p>
            <div className='inline-flex gap-10'>
                <Link href="/todos"><button className='btn btn-soft btn-primary'>Start</button></Link>
                <Link href="/about"><button className='btn  btn-soft btn-info'>About</button></Link>
            </div>
        </section>
    )
}
