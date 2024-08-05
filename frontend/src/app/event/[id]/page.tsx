'use client'

import moment from "moment";
import { headers } from "next/headers";
import React, { useState, useEffect } from "react";
import Select from "react-select";

interface Event{
    id: string;
    name: string;
    desc: string;
    address: string;
    address2: string;
    city: string;
    state: {code:string, state: string} | null;
    zipcode: string;
    skills: string[] | null;
    urgency: string[];
    date: Date;
}

interface StateOption {
    code: string;
    state: string;
}

const urgencyOptions = [
    { value: "low", label: "Low" },
    { value: "med", label: "Medium"},
    { value: "high", label: "High"},
]
interface SkillOption {
	id: number;
	name: string;
}

async function getData(id: number) {
    // This is a new event will not have an id
    if(id == 0) {
        // Return an empty event object
    } else {
        const res = await fetch('/event/' + id)

        if(!res.ok) {
            throw new Error('Error obtaining data for event')
        }
        
        return res.json
    }
}

export default /*async*/ function Event({ params }: { params: { id: number } }) {
    //const event = await getData(params.id);
	
	const [event, setEvent] = useState<Event>({
	        id:'',
	        name:'',
	        desc:'',
	        address:'',
	        address2:'',
	        city:'',
	        state: null,
	        zipcode:'',
	        skills:[],
	        urgency:[],
	        date: moment(new Date()).toDate(),
	    });

    const [selectedSkillOptions, setSelectedSkillsOptoins] = useState<{value: string; label:string}[] | null>(null);
    const [skillOptions, setSkillOptions] = useState<{id: number; name: string}[]>([]);
    const handleSkillChange = (selectedSkillOptions: {value:string; label:string}[] | null) => {
        const selectedValues = selectedSkillOptions ? selectedSkillOptions.map(option => option.value) : null;
        setSelectedSkillsOptoins(selectedSkillOptions);
        setEvent(prevState => ({...prevState, skills: selectedValues}));
    };

    const [selectedStateOption, setSelectedStateOption] = useState<{value: string; label:string} | null>(null);
    const [stateOptions, setStateOptions] = useState<{value: string; label: string}[]>([]);
    const handleStateChange = async (selectedStateOption:{value: string; label: string} | null) => {
        let state = null;
        if (selectedStateOption){
            state = {code: selectedStateOption.value, state: selectedStateOption.label};
            setSelectedStateOption(selectedStateOption);
        } else{
            setSelectedStateOption(null);
        }
        setEvent(prevState => ({...prevState, state}));
    };

    const [selectedUrgencyOption, setSelectedUrgencyOption] = useState<{value: string; label:string}[]| null>(null);
    const handleUrgencyChange = (selectedUrgencyOption: {value:string; label:string}[] | null) => {
        let selectedValue = selectedUrgencyOption.values;
        setSelectedUrgencyOption(selectedUrgencyOption);
        setEvent(prevState => ({...prevState, urgency: selectedValue}));
    };

    async function saveEventData(e){
        e.preventDefault();
        await fetch(`/api/event/${event.id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application.json',
            },
            body: JSON.stringify(event),
        });
    }

    const handleEventDateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const {name, value, type } = e.target;
		setEvent({...event, date: moment(e.target.value).toDate()})
	};

    useEffect(()=>{
        const fetchEvent = async () => {
            const response = await fetch('/api/event/1');
            const data = await response.json();
            setEvent(data);
        };
    
        const fetchStates = async () => {
            const response = await fetch('/api/states');
            const data: StateOption[] = await response.json();
            setStateOptions(data.map(state => ({value: state.code, label:state.state})));
        };
		
		const fetchSkills = async () => {
            const response = await fetch('/api/skills');
            const data: SkillOption[] = await response.json();
            setSkillOptions(data.map(skill => ({ value: skill.id, label: skill.name })));
        };
        
		fetchSkills()
        fetchEvent();
        fetchStates();
    }, []);
    
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
                        <div className="mt-4 bg-sky-400 text-white">
                            <button type="submit" className="p-2 w-full" onClick={saveEventData}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}