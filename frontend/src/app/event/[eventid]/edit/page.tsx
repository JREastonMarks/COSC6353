'use client'
import React, { useState, useEffect } from 'react';
import moment from 'moment';
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

export default function EditEventPage({ params }: { params: { eventid: number } }) {
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
        eventdate: new Date(),
        volunteers: [],
    });
    const [skillOptions, setSkillOptions] = useState<{value: SkillOption, label: string}[]>([]);
    const [selectedSkillOptions, setSelectedSkillOptions] = useState<SkillOption[] | null>(null);
    const [stateOptions, setStateOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedStateOption, setSelectedStateOption] = useState<{ value: string; label: string } | null>(null);
    const [selectedUrgencyOption, setSelectedUrgencyOption] = useState<{ value: string; label: string } | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await fetch("/api/event/" + params.eventid);
            const data = await response.json();
            setEvent(data);
        };

        const fetchStates = async () => {
            const response = await fetch('/api/states');
            const data: StateOption[] = await response.json();
            setStateOptions(data.map(state => ({ value: state.code, label: state.state })));
        };

        const fetchSkills = async () => {
            const response = await fetch('/api/skills');
            const data: SkillOption[] = await response.json();
            setSkillOptions(data.map(skill => ({ value: skill, label: skill.name })));
        };

        fetchEvent()
        fetchStates();
        fetchSkills();
    }, []);

    const handleSkillChange = (selectedOptions: { value: Skill; label: string }[] | null) => {
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
            urgency: selectedOption ? selectedOption.value : ""
        }));
    };

    const handleEventDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEvent(prev => ({
            ...prev,
            eventdate: moment(e.target.value).toDate()
        }));
    };

    const saveEventData = async (e) => {
    }

    return (
        <form onClick={saveEventData}>
            <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                Event Management - {event.id}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                    <div className="mt-2">
                        <label htmlFor="eventName" className="block text-sm font-medium leading-6 text-gray-900">Event Name</label>
                    </div>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input id="eventName" name="eventName" type="text" placeholder="Event Name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={event.name} onChange={e => setEvent({ ...event, name: e.target.value })}></input>
                    </div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                    <div className="mt-2">
                        <label htmlFor="eventDescription" className="block text-sm font-medium leading-6 text-gray-900">Event Description</label>
                    </div>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <textarea id="eventDescription" name="eventDescription" rows={4} cols={50} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={event.desc} onChange={e => setEvent({ ...event, desc: e.target.value })}></textarea>
                    </div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                <div className="sm:col-span-1">
                    <div className="mt-2">
                        <label htmlFor="address1" className="block text-sm font-medium leading-6 text-gray-900">Event Address</label>
                    </div>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="text" id="address1" name="address1" placeholder="Street number and name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required value={event.address} onChange={e => setEvent({ ...event, address: e.target.value })}></input>
                    </div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                <div className="sm:col-span-1">
                    <div className="mt-2">
                        <label htmlFor="address2" className="block text-sm font-medium leading-6 text-gray-900">Event Address 2</label>
                    </div>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="text" id="address2" name="address2" placeholder="Optional" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required value={event.address2} onChange={e => setEvent({ ...event, address2: e.target.value })}></input>
                    </div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                    <div className="mt-2">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">Event City</label>
                    </div>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="text" id="city" name="city" placeholder="City name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required value={event.city} onChange={e => setEvent({ ...event, city: e.target.value })}></input>
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
                        <input type="text" id="zipcode" name="zipcode" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Zip Code" required value={event.zipcode} onChange={e => setEvent({ ...event, zipcode: e.target.value })}></input>
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
                        <label htmlFor="eventDate" className="block text-sm font-medium leading-6 text-gray-900">Volunteers</label>
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
            <div className="mt-4 bg-sky-400 text-white">
                <button type="submit" className="p-2 w-full">
                    Save
                </button>
            </div>
        </form>)
}