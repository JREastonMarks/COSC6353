'use client'
import React, { useState, useEffect } from 'react';

interface EventProps {
    id: number | null;
    name: string;
    description: string;
    address: string;
    address2: string;
    city: string;
    state: { code: string, state: string } | null;
    zipcode: string;
    skills: SkillOption[] | null;
    urgency: string;
    eventdate: Date;
}

interface User {
    id: number;
    lastName: string;
    firstName: string;
    middleInitial: string;
    sex: 'male' | 'female';
    birthdate: Date;
    cellPhone: string;
    workPhone: string;
    address: string;
    address2: string;
    city: string;
    state: { code: string, state: string } | null; // Adjusted to match the backend model
    zipcode: string;
    skills: string[] | null;
    preferences: string;
    selectedDates: Date[] | null;
    matched: boolean | undefined
}

interface Match {
    id: number | null;
    volunteer: User | null;
    event: EventProps | null;
}

interface SkillOption {
    id: number;
    name: string;
}

export default function MatchEventPage({ params }: { params: { eventid: number } }) {
    const [availableUsers, setAvailableUser] = useState<User[]>([])
    const [event, setEvent] = useState<EventProps>({
        id: null,
        name: '',
        description: '',
        address: '',
        address2: '',
        city: '',
        state: null,
        zipcode: '',
        skills: [],
        urgency: "",
        eventdate: new Date()
    });
    const changeMatchList = (possibleUser: User) => {
        if (possibleUser.matched === true) {
            possibleUser.matched = false
        } else {
            possibleUser.matched = true
        }
        const position = availableUsers.findIndex((element) => element.id = possibleUser.id)
        availableUsers[position] = possibleUser
    }

    const saveMatches = async (e) => {
        const matches = []
        for(const availableUser of availableUsers) {
            if(availableUser.matched === true) {
                let match = {
                    'id': null,
                    'volunteer': availableUser,
                    'event': event
                }
                matches.push(match)
            }
        }

        if(matches.length == 0) {
            console.error("No matches selected")
        }

        const response = await fetch(`/api/match`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(matches),
        });
        if (response.ok) {
            response.text().then((text) => {
                window.location.replace("/home")
            })
        } else {
            console.error('Failed to update event:', response.statusText);
        }
        
    }
    useEffect(() => {
        const fetchEvent = async () => {
            const response = await fetch("/api/event/" + params.eventid);
            const data = await response.json();
            setEvent(data);
        };

        const fetchUserMatches = async () => {
            const response = await fetch('/api/match/findUserMatches/' + params.eventid);
            const data: User[] = await response.json();
            setAvailableUser(data)
        }
        fetchEvent();
        fetchUserMatches();
    }, []);


    return (
        <div className="bg-grey-lightest px-16 py-10">
            <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                Select Volunteers
            </div>
            <div className="mb-4">
                <table class="table-fixed" style={{width: '100%'}}>
                    
                    <thead>
                        <tr>
                            <th>Matched</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableUsers.map((possibleUser, i) => (
                            <tr>
                                <td>
                                    <input 
                                        id={i}
                                        type="checkbox" 
                                        checked={possibleUser.matched}
                                        onChange={() => changeMatchList(possibleUser)}
                                    />
                                </td>
                                <td>{possibleUser.firstName}</td>
                                <td>{possibleUser.lastName}</td>
                                <td>
                                    {possibleUser.skills?.map((skill) => (
                                        <span>{skill.name}</span>
                                    ))}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 bg-sky-400 text-white">
                    <button type="submit" className="p-2 w-full" onClick={saveMatches}>
                        Save Volunteers
                    </button>
                </div>
        </div>
    )
    
    
}