'use client'
import React, { useState, useEffect } from 'react';
import HomeNotifications from "@/app/components/HomeNotifications"
import HomeAssignments from "@/app/components/HomeAssignments"

interface SkillOption {
    id: number;
    name: string;
}

interface UserProp {
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

export default function VolunteerHomePage(){
    const [user, setUser] = useState<UserProp>()

    useEffect(() => {

        const fetchUserMatches = async () => {
            const response = await fetch('/api/userInfo');
            const data: UserProp = await response.json();
            setUser(data)
        }
        fetchUserMatches();
    }, []);

    if (user == null) {
        return (<div></div>)
    }
    return(
        <div>
            <div className="py-8">
                <a href={ "/api/volunteerReport?format=CSV&userId=" + user.id} target="_blank">
                    Volunteer CSV Report
                </a>
                <p></p>
                <a href={ "/api/volunteerReport?format=PDF&userId=" +user.id} target="_blank">
                    Volunteer PDF Report
                </a>
            </div>
            <div className="py-8">
                <HomeNotifications></HomeNotifications>
            </div>
            <div className="py-8">
                <HomeAssignments></HomeAssignments>
            </div>
        </div>
    );
}