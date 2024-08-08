'use client'

import moment from 'moment';
import { headers } from "next/headers";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Define interfaces
interface EventProps {
    id: string;
    name: string;
    desc: string;
    address: string;
    address2: string;
    city: string;
    state: { code: string, state: string } | null;
    zipcode: string;
    skills: string[] | null;
    urgency: string[];
    date: Date;
    volunteers: Volunteers[];
}

interface StateOption {
    code: string;
    state: string;
}

const urgencyOptions = [
    { value: "low", label: "Low" },
    { value: "med", label: "Medium" },
    { value: "high", label: "High" },
];

const ratingOptions = [
    { value: "Bad", label: "Bad" },
    { value: "Fine", label: "Fine" },
    { value: "Great", label: "Great" },
];

interface SkillOption {
    id: number;
    name: string;
}

interface Volunteers {
    id: string;
    firstName: string;
    middleInitial: string;
    lastName: string;
}

interface History {
    volunteerId: string;
    performance: string | null;
}

// API calls
async function getData(id: number) {
    if (id === 0) {
        return {
            id: '',
            name: '',
            desc: '',
            address: '',
            address2: '',
            city: '',
            state: null,
            zipcode: '',
            skills: [],
            urgency: [],
            date: new Date(),
            volunteers: [],
        };
    } else {
        const res = await fetch(`/api/event/${id}`);
        if (!res.ok) {
            throw new Error('Error obtaining data for event');
        }
        return res.json();
    }
}

const EventsPage: React.FC<{ params: { id: number } }> = ({ params }) => {
    const [event, setEvent] = useState<EventProps>({
        id: '',
        name: '',
        desc: '',
        address: '',
        address2: '',
        city: '',
        state: null,
        zipcode: '',
        skills: [],
        urgency: [],
        date: new Date(),
        volunteers: [],
    });

    const [skillOptions, setSkillOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedSkillOptions, setSelectedSkillOptions] = useState<{ value: string; label: string }[] | null>(null);
    const [stateOptions, setStateOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedStateOption, setSelectedStateOption] = useState<{ value: string; label: string } | null>(null);
    const [selectedUrgencyOption, setSelectedUrgencyOption] = useState<{ value: string; label: string } | null>(null);
    const [volunteerHistories, setVolunteerHistories] = useState<History[]>([]);

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await getData(params.id);
            setEvent(data);
            if (data.state) {
                setSelectedStateOption({ value: data.state.code, label: data.state.state });
            }
            if (data.skills) {
                setSelectedSkillOptions(data.skills.map(skill => ({ value: skill, label: skill })));
            }
            if (data.urgency.length) {
                setSelectedUrgencyOption({ value: data.urgency[0], label: data.urgency[0] });
            }
        };

        const fetchStates = async () => {
            const response = await fetch('/api/states');
            const data: StateOption[] = await response.json();
            setStateOptions(data.map(state => ({ value: state.code, label: state.state })));
        };

        const fetchSkills = async () => {
            const response = await fetch('/api/skills');
            const data: SkillOption[] = await response.json();
            setSkillOptions(data.map(skill => ({ value: skill.id.toString(), label: skill.name })));
        };

        fetchEvent();
        fetchStates();
        fetchSkills();
    }, [params.id]);

    const handleSkillChange = (selectedOptions: { value: string; label: string }[] | null) => {
        setSelectedSkillOptions(selectedOptions);
        setEvent(prev => ({
            ...prev,
            skills: selectedOptions ? selectedOptions.map(option => option.value) : []
        }));
    };

    const handleStateChange = (selectedOption: { value: string; label: string } | null) => {
        setSelectedStateOption(selectedOption);
        setEvent(prev => ({
            ...prev,
            state: selectedOption ? { code: selectedOption.value, state: selectedOption.label } : null
        }));
    };

    const handleUrgencyChange = (selectedOption: { value: string; label: string } | null) => {
        setSelectedUrgencyOption(selectedOption);
        setEvent(prev => ({
            ...prev,
            urgency: selectedOption ? [selectedOption.value] : []
        }));
    };

    const handleEventDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEvent(prev => ({
            ...prev,
            date: moment(e.target.value).toDate()
        }));
    };

    const handleRatingChange = (volunteerId: string, selectedRatingOption: { value: string; label: string } | null) => {
        setVolunteerHistories(prev => {
            const existing = prev.find(hist => hist.volunteerId === volunteerId);
            if (existing) {
                existing.performance = selectedRatingOption ? selectedRatingOption.value : null;
                return [...prev];
            } else {
                return [...prev, { volunteerId, performance: selectedRatingOption ? selectedRatingOption.value : null }];
            }
        });
    };

    const saveEventData = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`/api/event/${event.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        await fetch(`/api/histories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(volunteerHistories),
        });
    };

    return (
        <div className="container mx-auto p-16">
            <div className="mx-auto">
                <div className="bg-white rounded shadow">
                    <form className="bg-grey-lightest px-16 py-10">
                        <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                            Event Management - {params.id}
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <label htmlFor="eventName" className="block text-sm font-medium leading-6 text-gray-900">Event Name</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input id="eventName" name="eventName" type="text" placeholder="Event Name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={event.name} onChange={e=>setEvent({...event, name: e.target.value})}></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <label htmlFor="eventDescription" className="block text-sm font-medium leading-6 text-gray-900">Event Description</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <textarea id="eventDescription" name="eventDescription" rows={4} cols={50} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={event.desc} onChange={e=>setEvent({...event, desc: e.target.value})}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="address1" className="block text-sm font-medium leading-6 text-gray-900">Event Address</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="address1" name="address1" placeholder="Street number and name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required value={event.address} onChange={e=>setEvent({...event, address: e.target.value})}></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="address2" className="block text-sm font-medium leading-6 text-gray-900">Event Address 2</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="address2" name="address2" placeholder="Optional" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required value={event.address2} onChange={e=>setEvent({...event, address2: e.target.value})}></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">Event City</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="city" name="city" placeholder="City name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required value={event.city} onChange={e=>setEvent({...event, city: e.target.value})}></input>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">Event State</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <Select options={stateOptions} value={selectedStateOption} onChange={handleStateChange} id="state" name="state" className="text-gray-900 placeholder:text-gray-400" required ></Select>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="zipcode" className="block text-sm font-medium leading-6 text-gray-900">Event Zip Code</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="zipcode" name="zipcode" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Zip Code" required value={event.zipcode} onChange={e=>setEvent({...event, zipcode: e.target.value})}></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="requiredSkills" className="block text-sm font-medium leading-6 text-gray-900">Required Skills</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <Select options={skillOptions} value={selectedSkillOptions} onChange={handleSkillChange} id="skills" name="skills" isMulti={true} className="text-gray-900 placeholder:text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="urgency" className="block text-sm font-medium leading-6 text-gray-900">Urgency</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <Select id="urgency" name="urgency" required options={urgencyOptions} value={selectedUrgencyOption} onChange={handleUrgencyChange} isMulti={false} className="text-gray-900 placeholder:text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="eventDate" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="date" id="date" name="date" maxLength={1} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required value={moment(event.date).format('YYYY-MM-DD')} onChange={handleEventDateChange}></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="eventDate" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                                </div>
                                <div className="mt-2 space-y-4">
                                    {event.volunteers.map(volunteer => (
                                        <div key={volunteer.id} className="flex items-center space-x-4">
                                            <div>
                                                {volunteer.firstName} {volunteer.middleInitial} {volunteer.lastName}
                                            </div>
                                            <div>
                                                <Select
                                                    options={ratingOptions}
                                                    onChange={(option) => handleRatingChange(volunteer.id, option)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-right">
                            <button
                                type="submit"
                                className="inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
