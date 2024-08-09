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

interface SkillOption {
    id: number;
    name: string;
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

export default function HomeAssignments(){
    const [events, setEvents] = useState<EventProps[]>([])

    useEffect(() => {

        const fetchUserMatches = async () => {
            const response = await fetch('/api/events');
            const data: EventProps[] = await response.json();
            setEvents(data)
        }
        fetchUserMatches();
    }, []);

    async function handleReportCSVSubmit(e) {
    }

    async function handleReportPDFSubmit(e) {
    }

    return(
        <table className="table-fixed" style={{width: '100%'}}>
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Rate Volunteers</th>
                    <th>Download Report</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event, i) => (
                    <tr>
                        <td>{event.name}</td>
                        <td>{event.eventdate}</td>
                        <td>
                            <a href={ "/event/" + event.id + "/rate"}>
                            Rate
                            </a>
                        </td>
                        <td>
                            <a href={ "/api/eventReport?format=CSV&eventId=" + event.id} target="_blank">
                                CSV Report
                            </a>
                            <p></p>
                            <a href={ "/api/eventReport?format=PDF&eventId=" + event.id} target="_blank">
                                PDF Report
                            </a>
                        </td>

                    </tr>
                ))}

            </tbody>
        </table>
    );
}