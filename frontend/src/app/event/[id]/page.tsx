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

const Events: React.FC<EventProps> = ({ id, name, desc, address, address2, city, state, zipcode, skills, urgency, date, volunteers }) => {
    return (
      <div className="mx-full">
        <div className="bg-white rounded shadow">
          <div className="py-8 font-bold text-black text-center text-md tracking-widest uppercase">
              {name} - ID: {id}
          </div>
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-left">
                  Description
              </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-12">{desc}</div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1 font-bold text-right">
                  At:
            </div>
            <div className="sm:col-span-2">{address}</div>
            <div className="sm:col-span-2">{address2}</div>
            <div className="sm:col-span-2">{city}, {state?.state} {zipcode}</div>
          </div>
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-right">
                  Date:
              </div>
              <div className="sm:col-span-2">{new Date(date).toLocaleString()}</div>
          </div>
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-right">
                  Skills:
              </div>
              <div className="sm:col-span-2">{skills?.join(', ')}</div>
          </div>
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-right">
                  Urgency:
              </div>
              <div className="sm:col-span-2">{urgency}</div>
          </div>
            <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-right">
                  Volunteers:
              </div>
            <div className="sm:col-span-2">
                {volunteers.map(volunteer => (
                <div key={volunteer.id} className="flex items-center space-x-4">
                    <div>
                        {volunteer.firstName} {volunteer.middleInitial} {volunteer.lastName}
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
    </div>
    );
  };

  export default function EventsPage() {
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
    const [eventId, setEventId] = useState('');
    const [events, setEvents] = useState<EventProps[]>([]);
    const [skillOptions, setSkillOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedSkillOptions, setSelectedSkillOptions] = useState<{ value: string; label: string }[] | null>(null);
    const [stateOptions, setStateOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedStateOption, setSelectedStateOption] = useState<{ value: string; label: string } | null>(null);
    const [selectedUrgencyOption, setSelectedUrgencyOption] = useState<{ value: string; label: string } | null>(null);
    const [volunteerHistories, setVolunteerHistories] = useState<History[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('/api/events');
            const data = await response.json();
            setEvents(data);
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

        fetchEvents();
        fetchStates();
        fetchSkills();
    }, []);

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
    
    

    const fetchEventById = async () => {
        if (!eventId) {
            console.error('Event ID is required');
            return;
        }

        const response = await fetch(`/api/event/${eventId}`);
        if (response.ok) {
            const eventData = await response.json();
            setEvent(eventData);
            // Optionally, fetch volunteer histories if needed
        } else {
            console.error('Failed to fetch event:', response.statusText);
        }
    };

    const saveEventData = async (e) => {
        e.preventDefault();

        if (!event) {
            console.error('No event data available');
            return;
        }

        if (event.id) {
            // Updating an existing event
            const response = await fetch(`/api/event/${event.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });

            if (response.ok) {
                // Update volunteer histories
                await fetch('/api/histories', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(volunteerHistories),
                });

                console.log('Event updated and histories updated successfully');
            } else {
                console.error('Failed to update event:', response.statusText);
            }
        } else {
            // Creating a new event
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });

            if (response.ok) {
                const createdEvent = await response.json();

                // Update volunteer histories with the new event ID
                const updatedVolunteerHistories = volunteerHistories.map(history => ({
                    ...history,
                    eventId: createdEvent.id, // Link histories to the new event
                }));

                // Saving volunteer histories
                await fetch('/api/histories', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedVolunteerHistories),
                });

                console.log('Event created and histories saved successfully');
            } else {
                console.error('Failed to create event:', response.statusText);
            }
        }
    };


    return (
        <div className="container mx-auto p-16">
            <div className="mx-auto">
                <div className="bg-white rounded shadow">
                    <div className="bg-grey-lightest px-16 py-10">
                        <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                            Events - ({events.length})
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-16">
                        {events.length === 0 ? (
                            <p className="text-gray-500 text-center">NO EVENTS YET!</p>
                        ) : (
                            events.map((event, index) => (
                            <Events key={index} 
                            id={event.id} 
                            name={event.name} 
                            desc={event.desc} 
                            address={event.address} 
                            address2={event.address2} 
                            city={event.city}
                            state={event.state}
                            zipcode={event.zipcode}
                            urgency={event.urgency}
                            skills={event.skills}
                            date={event.date}
                            volunteers={event.volunteers}
                            />
                            ))
                        )}
                    </div>
                <div className="bg-grey-lightest px-16 py-10">
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-16">
                    <div className="sm:col-span-2">
                        <div className="mt-2">
                            <label htmlFor="eventId" className="block text-sm font-medium leading-6 text-gray-900">
                                Fetch Event by Event ID
                            </label>
                        </div>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                            id="eventId"
                            name="eventId"
                            type="text"
                            placeholder="Event ID"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            value={eventId}
                            onChange={e => setEventId(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={fetchEventById} className="mt-2 p-2 bg-blue-500 text-white">
                        Fetch Event
                    </button>
                    </div>
                    {event && (
                    <form  onClick={saveEventData}>
                        <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                            Event Management - {event.id}
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
                    </form>
                    )}
                </div>
                </div>
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
                                value={event.desc}
                                onChange={e => setEvent({ ...event, desc: e.target.value })}
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
                                value={moment(event.date).format('YYYY-MM-DD')}
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
            </div>
        </div>
    );
}
