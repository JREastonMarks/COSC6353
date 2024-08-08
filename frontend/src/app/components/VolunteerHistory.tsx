'use client'

import React, { useState, useEffect} from "react";

interface HistoryProps {
    volunteer: User;
    event: Event;
    status: string;
    performance: string[] | null;
}

interface StateOption{
    code:string;
    state:string;
}

interface User {
    id: string;
    lastName: string;
    firstName: string;
    middleInitial: string;
}
interface Event {
    id: string;
    name: string;
    desc: string;
    address: string;
    address2: string;
    city: string;
    state: {code:string, state:string} | null;
    zipcode: string;
    skills: string[];
    urgency: string[];
    date: string;
}

const History: React.FC<HistoryProps> = ({ volunteer, event, status, performance }) => {
    return (
      <div className="mx-full">
        <div className="bg-white rounded shadow">
          <div className="py-8 font-bold text-black text-center text-md tracking-widest uppercase">
              {event.name}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-right">
                  Volunteer:
              </div>
              <div className="sm:col-span-2">{volunteer.firstName} {volunteer.middleInitial} {volunteer.lastName}</div>
          </div>
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-right">
                  Participation Status:
              </div>
              <div className="sm:col-span-2">{status}</div>
          </div>
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-right">
                  Date:
              </div>
              <div className="sm:col-span-2">{new Date(event.date).toLocaleString()}</div>
          </div>
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-right">
                  Location:
              </div>
              <div className="sm:col-span-2">{event.address} {event.address2}, {event.city}, {event.state} {event.zipcode}</div>
          </div>
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-right">
                  Required Skills:
              </div>
              <div className="sm:col-span-2">{event.skills.join(', ')}</div>
          </div>
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-right">
                  Urgency:
              </div>
              <div className="sm:col-span-2">{event.urgency}</div>
          </div>
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1 font-bold text-left">
                  Event Description
              </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-12">{event.desc}</div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-12">{performance}</div>
          </div>
        </div>
      </div>
    );
  };

export default function VolunteerHistory(){
    const [histories, setHistories] = useState<HistoryProps[]>([
    {
        volunteer: {
            id: '',
            lastName: '',
            firstName: '',
            middleInitial: ''
        },
        event: {
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
            date: ''
        },
        status: '',
        performance: []    
    }
    ]);
    
    const [user, setUser] = useState<User>({
        id: '',
        lastName: '',
        firstName: '',
        middleInitial: ''
    });

    const [events, setEvents] = useState<Event[]>([
    {
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
        date: ''
    }
    ]);

    useEffect(() => {
        const fetchHistories = async () => {
          const response = await fetch('/api/histories');
          const data = await response.json();

          setHistories(data);
        };
    
        fetchHistories();
      
        const fetchUser = async () => {
            const response = await fetch('/api/user/1');
            const data = await response.json();

            setUser(data);
        };

        fetchUser();
    
        const fetchEvent = async () => {
            const response = await fetch('/api/event/1');
            const data = await response.json();

            setEvents(data);
        };

        fetchEvent();
    }, []);

    return(
        <div className="container mx-auto p-16">
            <div className="mx-auto">
                <div className="bg-white rounded shadow">
                    <div className="bg-grey-lightest px-16 py-10">
                        <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                            Volunteer History - ({histories.length})
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-16">
                        {histories.length === 0 ? (
                            <p className="text-gray-500 text-center">NO PARTICIPATIONS YET!
                            <br></br>when you participated in an event, it'll be shown here.</p>
                        ) : (
                            histories.map((history, index) => (
                            <History key={index} volunteer={history.volunteer} event={history.event} status={history.status} performance={history.performance}/>
                        ))
                        )}
                    </div>
                </div>    
            </div>
        </div>
    );
}