'use client'
import useSWR from 'swr'
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

export default function HomeAssignments(){
    const [matches, setMatches] = useState<Match[]>([])

    useEffect(() => {

        const fetchUserMatches = async () => {
            const response = await fetch('/api/matches');
            const data: Match[] = await response.json();
            setMatches(data)
        }
        fetchUserMatches();
    }, []);

    return(
        <div>
        <table className="table-fixed" style={{width: '100%'}}>
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {matches.map((match, i) => (
                    <tr>
                        <td>{match.event?.name}</td>
                        <td>{match.event?.eventdate}</td>
                        <td>
                            {match.event?.address}<br/>
                            {match.event?.address2}<br/>
                            {match.event?.city}, {match.event?.state?.code} {match.event?.zipcode}
                            </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}