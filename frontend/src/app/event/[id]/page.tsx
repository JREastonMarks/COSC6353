'use client'

import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import { availableMemory } from "process";

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

    const [selectedSkillOptions, setSelectedSkillsOptoins] = useState ([])
    const handleSkillChange = (selectedSkillOptions) => {
        setSelectedSkillsOptoins(selectedSkillOptions);
    };
    
    return (
    
        <div className="flex flex-col items-center justify-center p-24">
            <h1 className="font-bold text-4xl mb-2">Event - {params.id}</h1>
            <h2 font-bold mb-8>Event Management</h2>
            <br></br>
            
            <div className="w-full">
                <label for="event name">Event Name: </label> <br></br>
                <input type="text" id="event name" name="event name" placeholder="Event's Name here" maxLength="50" required size="50" className="border border-black"></input>
            </div>
            
            <br></br>
            
            <div className="w-full">
                <label for="event desc">Event Description: </label> <br></br>
                <textarea id="event desc" name="event desc" placeholder="Event's description here" required rows="4" cols="50" className="border border-black"></textarea>
            </div>
            
            <br></br>

            <div className="w-full">
                <label for="location">Location: </label><br></br>
                <textarea id="location" name="location" required placeholder="Event's location here" rows="4" cols="50" size="50" className="border border-black"></textarea>
            </div> 

            <br></br>

            <div className="w-full">
                <label for="required skills" required>Required Skills:</label>
                <Select
                    options={skillOptions}
                    value={selectedSkillOptions}
                    onChange={handleSkillChange}
                    isMulti={true}
                />
            </div>

            <br></br>
            
            <div className="w-full">
                <label for="urgency">Urgency:</label>
                <select name="urgency" id="urgency" className="border border-black">
                    <option value="low">Low</option>
                    <option value="med">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <br></br>

            <div className="w-full">
                <label for="event date">Event Date: </label>
                <input type="date" id="event date" name="event date" className="border border-black"></input>
            </div> 

            <br></br>

            <button type="submit" className="w-1/6 border border-black">Save</button>
        </div>
    );
}