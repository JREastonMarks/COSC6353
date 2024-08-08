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
        console.log(res)
        if(res.redirected || res.status == 401) {
            window.location.href= "/login"
        }

        return res.json()})

    const { data, error, isLoading } = useSWR('/api/userInfo', fetcher)

    let redirect = "/"

    if (!data) return null

    redirect = "/home"

    return (
        <header className="bg-white rounded-lg border shadow-lg">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href={redirect}>Event Manager</a>
                </div>
                <div className="flex lg:gap-x-12">
                    Welcome {data['username']}
                    <a href="/api/logout">Log Out</a>
                </div>
            </nav>
        </header>
    );
}