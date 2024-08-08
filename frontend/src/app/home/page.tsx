'use client'
import useSWR from 'swr'
import VolunteerHomePage from '../components/VolunteerHomePage'
import AdminHomePage from '../components/AdminHomePage'

function DisplayUserHome(props: any) {
    if(props.role === "volunteer") {
        return (<VolunteerHomePage></VolunteerHomePage>)
    } else {
        return (<AdminHomePage></AdminHomePage>)
    }
}

export default function Home() {

    const fetcher = (...args: any[]) => fetch(...args).then(res => {
        if(res.redirected || res.status == 401) {
            window.location.href= "/login"
        }

        return res.json()}
    )

    const { data, error, isLoading } = useSWR('/api/userInfo', fetcher)

    if (!data) return null

    return (
        <div className="container mx-auto p-16">
            <div className="mx-auto">
                <div className="bg-white rounded shadow">
                    <div className="border-b py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                        Home
                    </div>
                </div>
                <DisplayUserHome role={data.role}></DisplayUserHome>
            </div>
        </div>
    )
}