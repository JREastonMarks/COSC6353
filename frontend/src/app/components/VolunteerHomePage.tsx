import HomeNotifications from "@/app/components/HomeNotifications"
import HomeAssignments from "@/app/components/HomeAssignments"

export default function VolunteerHomePage(){

    return(
        <div>
            <div className="mt- grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <HomeNotifications></HomeNotifications>
            </div>
            <div className="mt- grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <HomeAssignments></HomeAssignments>
            </div>
        </div>
    );
}