import HomeNotifications from "@/app/components/HomeNotifications"
import HomeAssignments from "@/app/components/HomeAssignments"

export default function VolunteerHomePage(){

    return(
        <div>
            <div className="py-8">
                <HomeNotifications></HomeNotifications>
            </div>
            <div className="py-8">
                <HomeAssignments></HomeAssignments>
            </div>
        </div>
    );
}