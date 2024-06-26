import React, { useState } from "react";
import Select from "react-select";

const availableVolunteer = [
    {value:"ronald", label:"ronald"}
];



export default function VolunteerMatching(){
    const [selectedVolOptions, setSelectedVolOptions] = useState([])
    const handleVolChange = (selectedVolOptions) => {
        setSelectedVolOptions(selectedVolOptions);
    };
    
    const availableVolunteers = [
        {user: "ronald",location:"Houston, Tx", skills:"IT Proficiency", preferences:"Food Banks", availability:"06-23-2024"}
    ]
    
    const availableEvents = [
        {eventName:"Event-0", eventDesc:"Food Bank", location:"Houston, Tx", requiredSkills:"IT Proficiency", urgency:"Medium", eventDate:"6-23-2024"}
    ]
    return(
        <div className="flex flex-col items-center justify-center p-24">
                <h1 className="font-bold text-4xl mb-2" >Volunteer Matching Form</h1>
                <br></br>
                <div className="w-full mb-2">
                    <label htmlFor="volunteers">Volunteers</label>
                    <table className="w-full">
                        <tr>
                            <th className="border border-black">Name</th>
                            <th className="border border-black">Location</th>
                            <th className="border border-black">Skills</th>
                            <th className="border border-black">Preference</th>
                            <th className="border border-black">Availability</th>
                        </tr>

                        <tr>
                            <td className="border border-black">{availableVolunteers.map(availableVolunteers => <div>{availableVolunteers.user}</div>)}</td>
                            <td className="border border-black">{availableVolunteers.map(availableVolunteers => <div>{availableVolunteers.location}</div>)}</td>
                            <td className="border border-black">{availableVolunteers.map(availableVolunteers => <div>{availableVolunteers.skills}</div>)}</td>
                            <td className="border border-black">{availableVolunteers.map(availableVolunteers => <div>{availableVolunteers.preferences}</div>)}</td>
                            <td className="border border-black">{availableVolunteers.map(availableVolunteers => <div>{availableVolunteers.availability}</div>)}</td>
                        </tr> 
                    </table>
                </div>
                
                <br></br>
                
                <div className="w-full mb-2">
                    <label htmlFor="events">Events</label>
                    <table className="w-full">
                        <tr>
                            <th className="border border-black">Select</th>
                            <th className="border border-black">Event Name</th>
                            <th className="border border-black">Description</th>
                            <th className="border border-black">Location</th>
                            <th className="border border-black">Required Skills</th>
                            <th className="border border-black">Urgency</th>
                            <th className="border border-black">Event Date</th>
                        </tr>

                        <tr>
                            <td className="border border-black">{availableEvents.map(availableEvents => <div>{<Select
                                                                                                                options={availableVolunteer}
                                                                                                                value={selectedVolOptions}
                                                                                                                onChange={handleVolChange}
                                                                                                                isMultu={true}
                                                                                                             />}</div>)}</td>
                            <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.eventName}</div>)}</td>
                            <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.eventDesc}</div>)}</td>
                            <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.location}</div>)}</td>
                            <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.requiredSkills}</div>)}</td>
                            <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.urgency}</div>)}</td>
                            <td className="border border-black">{availableEvents.map(availableEvents => <div>{availableEvents.eventDate}</div>)}</td>
                        </tr>
                    </table>
                    <br></br>
                    <button type="submit" className="w-1/6 border border-black">Match</button>
                </div>
            </div>
    );
}
