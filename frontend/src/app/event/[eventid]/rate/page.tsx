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
    rating: number | null;
}

interface SkillOption {
    id: number;
    name: string;
}

export default function RateEventPage({ params }: { params: { eventid: number } }) {
    const [matches, setMatches] = useState<Match[]>([])

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch("/api/match/findEventMatches/" + params.eventid);
            const data: Match[] = await response.json();
            setMatches(data);
        };

        fetchMatches();
    }, []);

    return (
        <div className="bg-grey-lightest px-16 py-10">
            <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                Rate Volunteers
            </div>
            <div className="mb-4">
                <table class="table-fixed" style={{width: '100%'}}>
                    
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match, i) => (
                            <tr>
                                <td>{match.volunteer?.firstName + " " + match.volunteer?.lastName}</td>
                                <td>{match.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}