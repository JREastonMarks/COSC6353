import HomeNotifications from "@/app/components/HomeNotifications"
import HomeEvents from "@/app/components/HomeEvents"

export default function VolunteerHomePage(){

    return(
        <div>
            <div className="py-8">
                <HomeNotifications></HomeNotifications>
            </div>
            <div className="py-8">
                Create a new Event <a href="/event/create">here</a>.
                <HomeEvents></HomeEvents>
            </div>
        </div>
    );
}