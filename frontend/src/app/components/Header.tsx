'use client'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'


export default function Header() {
    const pathname = usePathname()

    if((pathname == "/") || (pathname == "/login") || (pathname == "/register")) {
        return null
    }

    // Check login
    const fetcher = (...args: any[]) => fetch(...args).then(res => {
        if(res.redirected) {
            window.location.href= "/login"
        }
        return res.json()})

    const { data, error, isLoading } = useSWR('/api/userInfo', fetcher)

    if (!data) return null

    return (
        <header className="bg-white rounded-lg border shadow-lg">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/">Event Manager</a>
                </div>
                <div className="flex lg:gap-x-12">
                    Welcome {data['username']}
                    <a href="/api/logout">Log Out</a>
                </div>
            </nav>
        </header>
    );
}