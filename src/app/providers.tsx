'use client'

import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Providers({ children }: { children: ReactNode }) {
    const [qc] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={qc}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
