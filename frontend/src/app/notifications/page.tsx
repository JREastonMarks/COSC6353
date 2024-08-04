'use client'

import React, { useState, useEffect } from 'react';

interface NotificationProps {
  receiver: User;
  sender: User;  
  title: string;
  message: string;
  date: string;
}

interface User {
    id: string;
    lastName: string;
    firstName: string;
    middleInitial: string;
    cellPhone: number;
    workPhone: number;
    email: string;
    
}

const Notification: React.FC<NotificationProps> = ({ title, sender, message, date }) => {
  return (
    <div className="mx-full">
      <div className="bg-white rounded shadow">
        <div className="py-8 font-bold text-black text-center text-md tracking-widest uppercase">
            {title}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1 font-bold text-right">
                From:
            </div>
            <div className="sm:col-span-2">{sender.firstName} {sender.middleInitial} {sender.lastName}</div>
        </div>
        <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1 font-bold text-right">
                Date:
            </div>
            <div className="sm:col-span-2">{new Date(date).toLocaleString()}</div>
        </div>
        <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1 font-bold text-left">
                Message
            </div>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-12">{message}</div>
        </div>
      </div>
    </div>
  );
};

const UserList: React.FC<{ users: User[]; searchQuery: string }> = ({ users, searchQuery }) => {
  return (
    <div>
      {users
        .filter(user =>
          user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.id.includes(searchQuery)
        )
        .map(user => (
          <div key={user.id} className="user border border-gray-300 p-4 rounded-md mb-4">
            <h3 className="font-semibold">{user.full_name}</h3>
            <p>User ID: {user.id}</p>
            <p>Last Name: {user.last_name}</p>
            <p>First Name: {user.first_name} M.I: {user.middle_initial}</p>
            <p>Cell phone: {user.cell_phone}</p>
            <p>Work phone: {user.work_phone}</p>
            <p>Email: {user.email}</p>
            <p>Skills: {user.skills.join(', ')}</p>
            <p>Preferences: {user.preferences.join(', ')}</p>
            <p>Availability: {user.availability_status}</p>
          </div>
        ))}
    </div>
  );
};

export default function AdministratorNotifications() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [showCreateMessage, setShowCreateMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      // const response = await fetch('/api/users'); // You need to create this API endpoint
      // const data = await response.json();
      const data = [];
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    alert('Message sent!');
  };

  return (
    <div className="container mx-auto p-16">
      <div className="mx-auto">
          <div className="bg-white rounded shadow">
              <div className="bg-grey-lightest px-16 py-10">
                  <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                    Notifications - ({notifications.length})
                  </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-16">
                {notifications.length === 0 ? (
                    <p className="text-gray-500 text-center">NO NOTIFICATIONS YET!
                    <br></br>when you get a message it'll be shown here.</p>
                  ) : (
                    notifications.map((notification, index) => (
                      <Notification key={index} sender={notification.sender} title={notification.title} message={notification.message} date={notification.date} />
                  ))
                )}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-16">
              
            </div>
          </div>    
        </div>
      </div>
  );
}
