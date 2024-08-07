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
}

interface StateOption {
    code: string;
    state: string;
}

interface SkillOption {
    id: number;
    name: string;
}


export default function Management() {
    const [user, setUser] = useState<User>({
        id: '',
        lastName: '',
        firstName: '',
        middleInitial: '',
        sex: 'male',
        birthdate: moment(new Date()).toDate(),
        cellPhone: '',
        workPhone: '',
        address: '',
        address2: '',
        city: '',
        state: null,
        zipcode: '',
        skills: [],
        preferences: '',
        selectedDates: [],
    });

    const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setUser({...user, birthdate: moment(e.target.value).toDate()})
    };
    
    
    const [selectedSkillOptions, setSelectedSkillOptions] = useState<{ value: string; label: string }[] | null>(null);
    const [skillOptions, setSkillOptions] = useState<{ id: number; name: string }[]>([]);

    const handleSkillChange = (selectedSkillOptions: { value: string; label: string }[] | null) => {
        if (selectedSkillOptions && selectedSkillOptions.length > 3) {
            selectedSkillOptions = selectedSkillOptions.slice(0, 3);
            alert("You can select a maximum of 3 skills.");
        }
        const selectedValues = selectedSkillOptions ? selectedSkillOptions.map(option => option.value) : null;
        setSelectedSkillOptions(selectedSkillOptions);
        setUser(prevState => ({ ...prevState, skills: selectedValues }));
    };
   
    const [selectedStateOption, setSelectedStateOption] = useState<{ value: string; label: string } | null>(null);
    const [stateOptions, setStateOptions] = useState<{ value: string; label: string }[]>([]);

    const handleStateChange = async (selectedStateOption: { value: string; label: string } | null) => {
        let state = null;
        if (selectedStateOption) {
            state = { code: selectedStateOption.value, state: selectedStateOption.label };
            setSelectedStateOption(selectedStateOption);
        } else {
            setSelectedStateOption(null);
        }
        setUser(prevState => ({ ...prevState, state }));
    };

    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const handleDateChange = async (dates: Date[]) => {
        const filteredDates = dates.filter(date => date >= addDays(new Date(), 0));
        const slicedDates = filteredDates.slice(0, 5);
        setSelectedDates(slicedDates);
        setUser(prevState => ({ ...prevState, selectedDates: slicedDates }));
    };

    // Handle change for sex radio buttons
    const handleSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUser(prevState => ({ ...prevState, sex: value as 'male' | 'female' }));
    };

    // Save user data to the backend
    async function saveUserData(e) {
        e.preventDefault();

        await fetch(`/api/user/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then(response => response.text())
          .then((text) => {
            if (text == "success") {
                window.location.replace("/home")
            }
        })
    }
    
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/userInfo');
            const data = await response.json();
            setUser(data);
        };

        const fetchStates = async () => {
            const response = await fetch('/api/states');
            const data: StateOption[] = await response.json();
            setStateOptions(data.map(state => ({ value: state.code, label: state.state })));
        };

        const fetchSkills = async () => {
            const response = await fetch('/api/skills');
            const data: SkillOption[] = await response.json();
            setSkillOptions(data.map(skill => ({ value: skill.id, label: skill.name })));
        };

        fetchUser();
        fetchStates();
        fetchSkills();
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
                            <div className="sm:col-span-3">
                                <div className="mt-2">
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="firstName" name="firstName" placeholder="Enter you first name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.firstName} onChange={e => setUser({...user, firstName: e.target.value })} minLength={1} maxLength={24} required></input>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="middleInitial" className="block text-sm font-medium leading-6 text-gray-900">Middle Initial</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="middleInitial" name="middleInitial" placeholder="Middle Initial" maxLength={1} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.middleInitial} onChange={e => setUser({...user, middleInitial: e.target.value })}></input>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <div className="mt-2">
                                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="lastName" name="lastName" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter you last name" value={user.lastName} onChange={e => setUser({...user, lastName: e.target.value})} minLength={1} maxLength={24} required></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">Date of Birth</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="date"
                                        id="dob"
                                        name="birthdate"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={moment(user.birthdate).format('YYYY-MM-DD')}
                                        onChange={handleBirthDateChange}
                                        required
                                    />                                
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="flex ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="sex"
                                        value="male"
                                        checked={user.sex === 'male'}
                                        className="border-0 bg-transparent text-indigo-600 focus:ring-0"
                                        onChange={handleSexChange}
                                    />                                    
                                    <label htmlFor="male" className="block text-sm font-medium leading-6 text-gray-900">Male</label>
                                    <input
                                        type="radio"
                                        id="female"
                                        name="sex"
                                        value="female"
                                        checked={user.sex === 'female'}
                                        className="border-0 bg-transparent text-indigo-600 focus:ring-0"
                                        onChange={handleSexChange}
                                    />                                        
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
                                    <input type="text" id="cellPhone" name="cellPhone" placeholder="Enter you cell phone" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.cellPhone} onChange={e => setUser({...user, cellPhone: e.target.value})} minLength={10} maxLength={15} required></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="workPhone" className="block text-sm font-medium leading-6 text-gray-900">Work Phone</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="workPhone" name="workPhone" placeholder="Enter you work phone" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.workPhone} onChange={e => setUser({...user, workPhone: e.target.value})} minLength={10} maxLength={15} required></input>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="address1" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="address1" name="address1" placeholder="Street number and name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.address} onChange={e => setUser({...user, address: e.target.value})} minLength={5} maxLength={100} required></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="mt-2">
                                    <label htmlFor="address2" className="block text-sm font-medium leading-6 text-gray-900">Address 2</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="address2" name="address2" placeholder="Optional" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.address2} onChange={e => setUser({...user, address2: e.target.value})} minLength={5} maxLength={100}></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" id="city" name="city" placeholder="City name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.city} onChange={e => setUser({...user, city: e.target.value})} minLength={1} maxLength={100} required></input>
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
                                    <input type="text" id="zipcode" name="zipcode" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Zip Code" value={user.zipcode} onChange={e => setUser({...user, zipcode: e.target.value})} minLength={5} maxLength={9} required></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <label htmlFor="skill" className="block text-sm font-medium leading-6 text-gray-900">Skills (Max 3)</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <Select 
                                        options={skillOptions} 
                                        value={selectedSkillOptions} 
                                        onChange={handleSkillChange} 
                                        id="skills" 
                                        name="skills" 
                                        isMulti 
                                        className="text-gray-900 placeholder:text-gray-400" 
                                    />                               
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="mt-2">
                                    <label htmlFor="preferences" className="block text-sm font-medium leading-6 text-gray-900">Preferences</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <textarea id="preferences" name="preferences" rows={4} cols={50} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={user.preferences} onChange={e => setUser({...user, preferences: e.target.value})} minLength={0} maxLength={255}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <div className="mt-4">
                                    <label htmlFor="datePicker" className="block text-sm font-medium leading-6 text-gray-900">Availability</label>
                                </div>
                                <div className="flex">
                                        <DatePicker 
                                            id="datePicker" 
                                            name="datePicker" 
                                            mode="multiple" 
                                            value={selectedDates} 
                                            onChange={handleDateChange} 
                                            disabledDate={(date) => date < addDays(new Date(), 0)} 
                                            showToday={false} 
                                            className="text-gray-900 placeholder:text-gray-400"
                                        />
                                </div>
                                <div className="mt-2">
                                    <p className="text-gray-700">
                                        Selected Dates: 
                                        {user.selectedDates && user.selectedDates.length > 0
                                        ? user.selectedDates.map(date => moment(date).format("MM/DD/YYYY")).join(", ")
                                        : "No dates selected"}
                                    </p>
                                    {user.selectedDates && user.selectedDates.length >= 5 && (
                                        <p className="text-red-600">Maximum 5 dates can be selected!</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 bg-sky-400 text-white">
                            <button 
                            type="submit" 
                            className="p-2 w-full"
                            onClick={saveUserData}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
