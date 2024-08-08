import HomeNotifications from "@/app/components/HomeNotifications"
import HomeEvents from "@/app/components/HomeEvents"

export default function VolunteerHomePage(){

    async function handleReportCSVSubmit(e) {
    }

    async function handleReportPDFSubmit(e) {
    }

    return(
        <div>
            <div className="py-8">
                <HomeNotifications></HomeNotifications>
            </div>
            <div className="py-8">
                Create a new Event here.
                <HomeEvents></HomeEvents>
            </div>
            <div className="py-4">
                
                <button onClick={handleReportCSVSubmit}  className="p-2">
                    Report CSV
                </button>
                <button onClick={handleReportPDFSubmit}  className="p-2">
                    Report PDF
                </button>
            </div>
        </div>
    );
}