'use client'

import React, { useEffect, useState } from "react";
import Select from "react-select";

interface MatchProps{
    volunteer: User;
    event: Event;
    match: boolean;
}

interface User{
    id: string;
    lastName: string;
    middleInitial: string;
    firstName: string; 
    skills: string[];
}

interface Event{
    id: string;
    name: string;
    desc: string;
    address: string;
    address2: string;
    city: string;
    state: string[];
    zipcode: string;
    skills: string[];
    urgency: string[];
    date: Date;
}

const Match: React.FC<MatchProps> = ({volunteer, event, match}) => {
    return(
        <div className="mx-full">
            <div className="bg-white rounded shadow">
                <div className="py-8 font-bold text-black text-center text-md tracking-widest uppercase">
                    Matched Volunteers:
                </div> 
                <div className="mt-4 grid grid-cols-1 gap-x-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-1 font-bold text-right">
                        Volunteer:
                    </div>
                    <div className="sm:col-span-2">{volunteer.firstName} {volunteer.middleInitial} {volunteer.lastName}</div>
                </div>
                <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-1 font-bold text-left">
                        Event: 
                    </div>
                    <div className="sm:col-span-2">{event.name}</div>
                </div>
                <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-1 font-bold text-left">
                        Match:
                    </div>
                    <div className="sm:col-span-2">{match}</div>
                </div>
            </div>
        </div>
    );
};



export default function VolunteerMatching(){

    /*const [selectedSkillOptions, setSelectedSkillsOptoins] = useState<string[]> ([])
    const handleSkillChange = (selectedSkillOptions: string[]) => {
        const selectedValues = selectedSkillOptions ? selectedSkillOptions.map(option => option.valueOf) : [];
        setMatches(prevState => ({...prevState, skills: selectedValues}));
        setSelectedSkillsOptoins(selectedSkillOptions);
    };*/
    const [matches, setMatches] = useState<MatchProps[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch('api/matches');
            const data = await response.json();
            setMatches(data);
        };

        fetchMatches();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('api/users');
            const data = await response.json();

            setUsers(data);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await fetch('api/events');
            const data = await response.json();

            setEvents(data);

        };

        fetchEvent();

    }, []);

    return(
        
        <div className="container mx-auto p-16">
            <div className="mx-auto">
                <div className="bg-grey-lightest px-16 py-10">
                    <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                        Matches - ({matches.length})
                    </div>
                </div>
                <div className="mt-4 grid grid-cols1 gap-x-6 gap-y-8 sm:grid-cols-16">
                    {matches.length === 0 ? (
                        <p className="text-gray-500 text-center">No Matches Yet.
                            <br></br>when there are matches, they will appear here.
                        </p>
                    ) : (
                        matches.map((match, index) => (
                            <Match key={index} 
                            volunteer={match.volunteer} 
                            event={match.event} 
                            match={match.match}/>
                        ))
                    )}
                </div>
                <div className="mb-4 w-full">
                    <button type="submit" className="bg-black text-white py-2 px-4 rounded">Match</button>
                </div>
            </div>
        </div>
        
        /*<div className="flex flex-col items-center justify-center p-24">
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
            </div>*/
    );
}
