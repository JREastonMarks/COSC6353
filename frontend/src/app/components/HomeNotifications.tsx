'use client'
import useSWR from 'swr'

export default function HomeNotifications(){

    const fetcher = (...args: any[]) => fetch(...args).then(res => {
        if(res.redirected || res.status == 401) {
            window.location.href= "/login"
        }

        return res.json()})

    const { data, error, isLoading } = useSWR('/api/notifications', fetcher)

    if (!data) return null

    return(
        <div>
            You currently have {data.length} notifications. Click <a href="/notifications">here</a> to view them.
        </div>
    );
}