'use client'
import moment from 'moment';
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

export default function CreateEventPage() {
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
        e.preventDefault();

        if (!event) {
            console.error('No event data available');
            return;
        }

        const response = await fetch(`/api/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (response.ok) {
            response.text().then((text) => {
                window.location.replace("/event/" + text + "/match")
            })
        } else {
            console.error('Failed to update event:', response.statusText);
        }
    };

    return (
        <div>
            <form className="bg-grey-lightest px-16 py-10">
                <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                    Create New Event
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Event Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter event name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={event.name}
                        onChange={e => setEvent({ ...event, name: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">
                        Description
                    </label>
                    <textarea
                        id="desc"
                        placeholder="Enter event description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={event.description}
                        onChange={e => setEvent({ ...event, description: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Enter address"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={event.address}
                        onChange={e => setEvent({ ...event, address: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address2">
                        Address 2
                    </label>
                    <input
                        id="address2"
                        type="text"
                        placeholder="Apartment, suite, unit, etc."
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={event.address2}
                        onChange={e => setEvent({ ...event, address2: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        City
                    </label>
                    <input
                        id="city"
                        type="text"
                        placeholder="Enter city"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={event.city}
                        onChange={e => setEvent({ ...event, city: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                        State
                    </label>
                    <Select
                        id="state"
                        value={selectedStateOption}
                        onChange={handleStateChange}
                        options={stateOptions}
                        placeholder="Select state"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipcode">
                        Zip Code
                    </label>
                    <input
                        id="zipcode"
                        type="text"
                        placeholder="Enter zip code"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={event.zipcode}
                        onChange={e => setEvent({ ...event, zipcode: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">
                        Skills
                    </label>
                    <Select
                        id="skills"
                        isMulti
                        value={selectedSkillOptions}
                        onChange={handleSkillChange}
                        options={skillOptions}
                        placeholder="Select skills"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="urgency">
                        Urgency
                    </label>
                    <Select
                        id="urgency"
                        value={selectedUrgencyOption}
                        onChange={handleUrgencyChange}
                        options={urgencyOptions}
                        placeholder="Select urgency"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Event Date
                    </label>
                    <input
                        id="date"
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={moment(event.eventdate).format('YYYY-MM-DD')}
                        onChange={handleEventDateChange}
                    />
                </div>
                <div className="mt-4 bg-sky-400 text-white">
                    <button type="submit" className="p-2 w-full" onClick={saveEventData}>
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    )
}