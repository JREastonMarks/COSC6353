'use client'

import React, { useState, useEffect} from "react";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import { addDays } from "date-fns";
import moment from 'moment';

interface User {
    id: string;
    lastName: string;
    firstName: string;
    middleInitial: string;
    sex: 'male' | 'female';
    birthdate: Date;
    cellPhone: number;
    workPhone: number;
    email: string;
    password: string;
    address: string;
    address2: string;
    city: string;
    state: { code: string, state: string } | null; // Adjusted to match the backend model
    zipcode: string;
    skills: string[];
    preferences: string;
    selectedDates: Date[];
}

interface StateOption {
    code: string;
    state: string;
}

// const skillOptions = [
//     { value: "Database Management", label: "Database Management" },
//     { value: "IT Proficiency", label: "IT Proficiency" },
//     { value: "Website Management", label: "Website Management" },
//     { value: "Project Management", label: "Project Management" },
//     { value: "Time Management", label: "Time Management" },
//     { value: "Budgeting", label: "Budgeting" },
//     { value: "Communication", label: "Communication" },
//     { value: "Teamwork", label: "Teamwork" },
//     { value: "Problem-Solving", label: "Problem-Solving" },
//     { value: "Fundraising", label: "Fundraising" },
//     { value: "Grant Writing", label: "Grant Writing" },
//     { value: "Policy and Advocacy", label: "Policy and Advocacy" },
//     { value: "Leadership", label: "Leadership" },
//     { value: "Adaptability", label: "Adaptability" },
//     { value: "Ethical Awareness", label: "Ethical Awareness" },
//     { value: "Empathy", label: "Empathy" },
//     { value: "Cultural Competence", label: "Cultural Competence" },
//     { value: "Resilience", label: "Resilience" }
// ];

// const stateOptions = [
//     { value: 'AL', label: 'Alabama' },
//     { value: 'AK', label: 'Alaska' },
//     { value: 'AZ', label: 'Arizona' },
//     { value: 'AR', label: 'Arkansas' },
//     { value: 'CA', label: 'California' },
//     { value: 'CO', label: 'Colorado' },
//     { value: 'CT', label: 'Connecticut' },
//     { value: 'DE', label: 'Delaware' },
//     { value: 'FL', label: 'Florida' },
//     { value: 'GA', label: 'Georgia' },
//     { value: 'HI', label: 'Hawaii' },
//     { value: 'ID', label: 'Idaho' },
//     { value: 'IL', label: 'Illinois' },
//     { value: 'IN', label: 'Indiana' },
//     { value: 'IA', label: 'Iowa' },
//     { value: 'KS', label: 'Kansas' },
//     { value: 'KY', label: 'Kentucky' },
//     { value: 'LA', label: 'Louisiana' },
//     { value: 'ME', label: 'Maine' },
//     { value: 'MD', label: 'Maryland' },
//     { value: 'MA', label: 'Massachusetts' },
//     { value: 'MI', label: 'Michigan' },
//     { value: 'MN', label: 'Minnesota' },
//     { value: 'MS', label: 'Mississippi' },
//     { value: 'MO', label: 'Missouri' },
//     { value: 'MT', label: 'Montana' },
//     { value: 'NE', label: 'Nebraska' },
//     { value: 'NV', label: 'Nevada' },
//     { value: 'NH', label: 'New Hampshire' },
//     { value: 'NJ', label: 'New Jersey' },
//     { value: 'NM', label: 'New Mexico' },
//     { value: 'NY', label: 'New York' },
//     { value: 'NC', label: 'North Carolina' },
//     { value: 'ND', label: 'North Dakota' },
//     { value: 'OH', label: 'Ohio' },
//     { value: 'OK', label: 'Oklahoma' },
//     { value: 'OR', label: 'Oregon' },
//     { value: 'PA', label: 'Pennsylvania' },
//     { value: 'RI', label: 'Rhode Island' },
//     { value: 'SC', label: 'South Carolina' },
//     { value: 'SD', label: 'South Dakota' },
//     { value: 'TN', label: 'Tennessee' },
//     { value: 'TX', label: 'Texas' },
//     { value: 'UT', label: 'Utah' },
//     { value: 'VT', label: 'Vermont' },
//     { value: 'VA', label: 'Virginia' },
//     { value: 'WA', label: 'Washington' },
//     { value: 'WV', label: 'West Virginia' },
//     { value: 'WI', label: 'Wisconsin' },
//     { value: 'WY', label: 'Wyoming' }
// ];

export default function Administrator() {
    // const [selectedSkillOptions, setSelectedSkillOptions] = useState<string[]>([])
    // const handleSkillChange = (selectedSkillOptions: string[]) => {
    //     const selectedValues = selectedSkillOptions ? selectedSkillOptions.map(option => option.value) : [];
    //     if (selectedSkillOptions.length <= 3) {
    //         setUser(prevState => ({ ...prevState, skills: selectedValues }));
    //         setSelectedSkillOptions(selectedSkillOptions);
    //     }
    // };

    const [selectedStateOption, setSelectedStateOption] = useState<{ value: string; label: string } | null>(null);
    const [stateOptions, setStateOptions] = useState<{ value: string; label: string }[]>([]);
    const handleStateChange = (selectedStateOption: { value: string; label: string } | null) => {
        if (selectedStateOption) {
            const state = { code: selectedStateOption.value, state: selectedStateOption.label };
            setUser(prevState => ({ ...prevState, state }));
            setSelectedStateOption(selectedStateOption);
        } else {
            setUser(prevState => ({ ...prevState, state: null }));
            setSelectedStateOption(null);
        }
    };

    // const [selectedDates, setSelectedDates] = useState<Date[]>([])
    // const handleDateChange = (dates: Date[]) => {
    //     const filteredDates = dates.filter(date => date >= addDays(new Date(), 0));
    //     const slicedDates = filteredDates.slice(0, 5);
    //     setSelectedDates(slicedDates);
    // };

    const [user, setUser] = useState<User>({
        id: '',
        lastName: '',
        firstName: '',
        middleInitial: '',
        sex: 'male',
        birthdate: new Date(),
        cellPhone: '',
        workPhone: '',
        email: '',
        password: '',
        address: '',
        address2: '',
        city: '',
        state: null,
        zipcode: '',
        skills: [],
        preferences: '',
        selectedDates: [],
    });

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/user/1');
            const data = await response.json();
            setUser(data);
        };

        const fetchStates = async () => {
            const response = await fetch('/api/states');
            const data: StateOption[] = await response.json();
            setStateOptions(data.map(state => ({ value: state.code, label: state.state })));
        };

        fetchUser();
        fetchStates();
    }, []);

    return (
        <div className="container mx-auto p-16">
            <div className="mx-auto">
                <div className="bg-white rounded shadow">
                    <form className="bg-grey-lightest px-16 py-10">
                        <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                            Profile Management
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">E-Mail</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input id="email" name="email" type="text" placeholder="E-Mail" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.email}></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input id="password" name="password" type="password" placeholder="*****" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.password}></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <div className="mt-2">
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="firstName" name="firstName" placeholder="Enter you first name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.firstName} required></input>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="middleInitial" className="block text-sm font-medium leading-6 text-gray-900">Middle Initial</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="middleInitial" name="middleInitial" placeholder="Middle Initial" maxLength={1} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.middleInitial}></input>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <div className="mt-2">
                                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="lastName" name="lastName" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter you last name" value={user.lastName} required></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">Date of Birth</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="date" id="dob" name="dob" maxLength={1} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.birthdate} required></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="flex ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="radio" id="male" name="sex" checked={user.sex === 'male'} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"></input>
                                    <label htmlFor="male" className="block text-sm font-medium leading-6 text-gray-900">Male</label>
                                    <input type="radio" id="female" name="sex" checked={user.sex === 'female'} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"></input>
                                    <label htmlFor="female" className="block text-sm font-medium leading-6 text-gray-900">Female</label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="cellPhone" className="block text-sm font-medium leading-6 text-gray-900">Cell Phone</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="cellPhone" name="cellPhone" placeholder="Enter you cell phone" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.cellPhone} required></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="workPhone" className="block text-sm font-medium leading-6 text-gray-900">Work Phone</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="workPhone" name="workPhone" placeholder="Enter you work phone" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.workPhone} required></input>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="address1" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="address1" name="address1" placeholder="Street number and name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.address} required></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="address2" className="block text-sm font-medium leading-6 text-gray-900">Address 2</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="address2" name="address2" placeholder="Optional" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.address2} required></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="city" name="city" placeholder="City name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.city} required></input>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">State</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <Select options={stateOptions}
                                        value={selectedStateOption}
                                        onChange={handleStateChange}
                                        id="state"
                                        name="state"
                                        className="text-gray-900 placeholder:text-gray-400"
                                        required></Select>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="zipcode" className="block text-sm font-medium leading-6 text-gray-900">Zip Code</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="zipcode" name="zipcode" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Zip Code" value={user.zipcode} required></input>
                                </div>
                            </div>
                        </div>
                        {/* <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <label htmlFor="skill" className="block text-sm font-medium leading-6 text-gray-900">Skills (Max 3)</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <Select options={skillOptions} value={user.skills.map(skill => ({ value: skill, label: skill }))}  onChange={handleSkillChange} id="skill" name="skill" className="block flex-1 text-gray-900 placeholder:text-gray-400" required></Select>
                                </div>
                            </div>
                        </div> */}
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <label htmlFor="preferences" className="block text-sm font-medium leading-6 text-gray-900">Preferences</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <textarea id="preferences" name="preferences" rows={4} cols={50} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.preferences}></textarea>
                                </div>
                            </div>
                        </div>
                        {/* <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <div className="mt-4">
                                    <label htmlFor="datePicker" className="block text-sm font-medium leading-6 text-gray-900">Availability</label>
                                </div>
                                <div className="flex ">
                                    <DatePicker id="datePicker" name="datePicker" mode="multiple" value={user.selectedDates} onChange={handleDateChange} disabledDate={(date) => date < addDays(new Date(), 0)} showToday={false} className="block flex-1 text-gray-900 placeholder:text-gray-400" />
                                </div>
                                <div className="mt-2">
                                    <p>Selected Dates: {user.selectedDates.map(date => moment(date).format("MM/DD/YYYY")).join(", ")}</p>
                                    {user.selectedDates.length >= 5 && (
                                        <p>Maximum 5 dates can be selected!</p>
                                    )}
                                </div>
                            </div>
                        </div> */}
                        <div className="mt-4 bg-sky-400 text-white">
                            <button className="p-2 w-full">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
