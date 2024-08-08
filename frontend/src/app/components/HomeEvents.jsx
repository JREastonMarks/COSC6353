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
        <table class="table-fixed" style={{width: '100%'}}>
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Skill</th>
                </tr>
            </thead>
            <tbody>
                {data.map((match) => {
                    <tr>
                        <td>{match.event.name}</td>
                        <td>{match.event.eventdate}</td>
                        <td>{match.skill}</td>
                    </tr>
                })}
            </tbody>
        </table>
    );
    return (<div>Hello 2</div>);
}