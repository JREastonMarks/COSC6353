'use client'
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

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

const rateOptions = [
    { value: 1, label: "Poor"},
    { value: 2, label: "Below Average"},
    { value: 3, label: "Average"},
    { value: 4, label: "Good"},
    { value: 5, label: "Excellent"}
]

export default function RateEventPage({ params }: { params: { eventid: number } }) {
    const [matches, setMatches] = useState<Match[]>([])

    const handleSkillChange = (id: number, selectedOption: any) => {
        const nextMatches = [...matches]
        const myMatch = nextMatches.find((element) => element.id === id)
        myMatch.rating = selectedOption.value
        
        setMatches(nextMatches)
    };

    const saveMatches = async (e) => {
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
                <table className="table-fixed" style={{width: '100%'}}>      
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
                                <td>
                                    <Select options={rateOptions} value={match.rating} onChange={(e) => handleSkillChange(match.id, e)} id="ratings" name="ratings" isMulti={false} className="text-gray-900 placeholder:text-gray-400" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 bg-sky-400 text-white">
                    <button type="submit" className="p-2 w-full" onClick={saveMatches}>
                        Save Ratings
                    </button>
                </div>
        </div>

    )
}