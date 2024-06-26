export default function VolunteerHistory(){
    
    const availableEvents = [
        {eventName:"Event-0", eventDesc:"Food Bank", location:"Houston, Tx", requiredSkills:"IT Proficiency", urgency:"Medium", eventDate:"6-23-2024"}
    ]

    const availableVolunteers = [
        {user: "ronald",location:"Houston, Tx", skills:"IT Proficiency", preferences:"Food Banks", availability:"06-23-2024", status:"Active"}
    ]
    
    return(
        <div className="flex flex-col items-center justify- center p-24">
            <h1 className="font-bold text-4xl mb-2">Volunteer History</h1>

            <div className="w-full">
                <label htmlFor="volunteer">Volunteer: {availableVolunteers.map(availableVolunteers => <div>{availableVolunteers.user}</div>)}</label>
                    
                <table className="w-full border border-black">
                    <tr>
                        <th className="border border-black">Event Name</th>
                        <th className="border border-black">Event Description</th>
                        <th className="border border-black">Location</th>
                        <th className="border border-black">Required Skills</th>
                        <th className="border border-black">Urgency</th>
                        <th className="border border-black">Event Date</th>
                        <th className="border border-black">Status</th>
                    </tr>

                    <tr>
                        <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.eventName}</div>)}</td>
                        <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.eventDesc}</div>)}</td>
                        <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.location}</div>)}</td>
                        <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.requiredSkills}</div>)}</td>
                        <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.urgency}</div>)}</td>
                        <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.eventDate}</div>)}</td>
                        <td className="border border-black">{availableVolunteers.map(availableVolunteers => <div>{availableVolunteers.status}</div>)}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}