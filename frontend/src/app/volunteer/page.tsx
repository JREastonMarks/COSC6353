'use client'

import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";

const skillOptions = [
    { value: "Database Management", label: "Database Management" },
    { value: "IT Proficiency", label: "IT Proficiency" },
    { value: "Website Management", label: "Website Management" },
    { value: "Project Management", label: "Project Management" },
    { value: "Time Management", label: "Time Management" },
    { value: "Budgeting", label: "Budgeting" },
    { value: "Communication", label: "Communication" },
    { value: "Teamwork", label: "Teamwork" },
    { value: "Problem-Solving", label: "Problem-Solving" },
    { value: "Fundraising", label: "Fundraising" },
    { value: "Grant Writing", label: "Grant Writing" },
    { value: "Policy and Advocacy", label: "Policy and Advocacy" },
    { value: "Leadership", label: "Leadership" },
    { value: "Adaptability", label: "Adaptability" },
    { value: "Ethical Awareness", label: "Ethical Awareness" },
    { value: "Empathy", label: "Empathy" },
    { value: "Cultural Competence", label: "Cultural Competence" },
    { value: "Resilience", label: "Resilience" }
];

const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
];

export default function Volunteer() {
    const [selectedSkillOptions, setSelectedSkillOptions] = useState ([])
    const handleSkillChange = (selectedSkillOptions) => {
        if (selectedSkillOptions.length <= 3) {
            setSelectedSkillOptions(selectedSkillOptions);
        }
    };

    const [selectedStateOptions, setSelectedStateOptions] = useState ([])
    const handleStateChange = (selectedSkillOptions) => {
            setSelectedSkillOptions(selectedStateOptions);
    };

    const [selectedDates, setSelectedDates] = useState([])
    const handleDateChange = (dates) => {
        setSelectedDates(dates);
    };

    return (
        <div className="flex flex-col items-center justify-center p-24">
            <h1 className="font-bold text-4xl mb-2">Volunteer</h1>
            <h2 className="font-bold mb-8">Profile Management</h2>
            <div className="w-full mb-2">
                <h2>user ID:</h2>
                <h2>username: </h2>
            <div className="flex flex-row w-full">
                <h2 className="w-1/2 mb-2">password: </h2>
                <button type="submit" className="w-1/5 border border-black">Change Password</button>
            </div>
                <h2 className="font-bold">Full Name</h2>
            </div>
            <div className="w-full">
                <label for="last_name">Last Name: </label>
                <input type="text" id="last_name" name="last_name" placeholder="Enter your last name" maxLength="25" required></input>
            </div>
            <div className="flex flex-row justify-center w-full mb-4">
                <div className="w-1/2">
                    <label for="first_name">First Name:  </label>
                    <input type="text" id="first_name" name="first_name" placeholder="Enter your first name" maxLength="25" required></input>
                </div>
                <div className="w-1/2">
                    <label for="middle_initial">Middle initial: </label>
                    <input type="text" id="middle_initial" name="middle_initial" placeholder="Enter your middle initial" maxLength="1"></input>
                </div>
            </div>
                
            <div className="flex flex-row w-full mb-4">
                <label for="dob">Date of Birth:  </label>
                <input type="date" id="dob" name="dob" required></input>
                <div className="flex flex-row justify-center w-1/2">
                    <div className="mr-4">
                        <label>Sex: </label>
                    </div>
                    <div className="mr-4">
                        <input type="radio" id="female" name="sex" value="female" className="mr-2"></input>
                        <label for="female">Female</label>
                    </div>
                    <div>
                        <input type="radio" id="male" name="sex" value="male" className="mr-2"></input>
                        <label for="male">Male</label>
                    </div>
                </div>
            </div>
            <div className="w-full mb-4">
                    <h2 className="font-bold">Phone numbers</h2>
                    <div className="flex flex-row w-full">
                        <div className="w-1/2">
                            <label for="cell_phone">Cell phone: </label>
                            <input type="tel" id="cell_phone" name="cell_phone" placeholder="Enter your cell phone" minLength="10" maxLength="10" required></input>
                        </div>
                        <div className="w-1/2">
                            <label for="work_phone">Work phone: </label>
                            <input type="tel" id="work_phone" name="work_phone" placeholder="Enter your work phone" minLength="10" maxLength="10"></input>
                        </div>
                    </div>
            </div>
            <div className="w-full mb-4">
                    <h2 className="font-bold mb-2">Address</h2>
                    <div>
                        <label for="address">Address: </label>
                        <input type="text" id="address" name="address" placeholder="Street number and name" maxLength="100" required></input> 
                    </div>
                    <div>
                        <label for="address2">Address 2: </label>
                        <input type="text" id="address2" name="address2" placeholder="Optional" maxLength="100"></input> 
                    </div>
                    <div className="flex flex-row justify-between w-full mb-4">
                        <div className="w-1/3">
                            <label for="city">City: </label>
                            <br></br>
                            <input type="text" id="city" name="city" placeholder="Enter your city" maxLength="100" required></input>
                        </div>
                        <div className="w-1/3">
                            <label for="p_state">State:</label>
                            <Select
                            options={stateOptions}
                            value={selectedStateOptions}
                            onChange={handleStateChange}
                            className="w-1/2"
                        />
                        </div>
                        <div className="w-1/3">
                            <label for="p_zipcode">Zip Code: </label>
                            <br></br>
                            <input type="text" id="p_zipcode" name="p_zipcode" placeholder="Enter your zipcode" minLength="5" maxLength="9" required></input>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="font-bold mb-2">Skills (maximum 3 skills)</label>
                        <br></br>
                        <Select
                            options={skillOptions}
                            value={selectedSkillOptions}
                            onChange={handleSkillChange}
                            isMulti={true}
                        />
                    </div>
                    <div>
                        <label for="preferences">Preferences: </label>
                        <textarea id="preferences" name="preferences" rows="4" cols="50" className="w-full border border-black"></textarea>
                    </div>
                    <div>
                        <h2 className="font-bold">Availability</h2>
                        <DatePicker
                            mode="multiple"
                            value={selectedDates}
                            onChange={handleDateChange}
                        />
                        <p>Selected Dates: {selectedDates.map(date => date.format("DD/MM/YYYY")).join(", ")}</p>
                    </div>
                    
            </div>
            <button type="submit" className="w-1/6 border border-black">Save</button>
        </div>
    );
}
