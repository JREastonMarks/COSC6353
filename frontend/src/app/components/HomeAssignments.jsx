'use client'
import useSWR from 'swr'

export default function HomeAssignments(){
    const fetcher = (...args) => fetch(...args).then(res => {
        if(res.redirected || res.status == 401) {
            window.location.href= "/login"
        }

        return res.json()})

    const { data, error, isLoading } = useSWR('/api/notifications', fetcher)

    if (!data) return null

    return(
        <div>
            You currently have {data.length} assignments.
        </div>
    );
    return (<div>Hello 2</div>);
}