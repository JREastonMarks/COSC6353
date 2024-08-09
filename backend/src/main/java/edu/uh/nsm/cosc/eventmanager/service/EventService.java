package edu.uh.nsm.cosc.eventmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.repository.EventRepository;

@Service
public class EventService{
    private EventRepository eventRepository;

    public EventService(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    public List<Event> getEvents(){
        return eventRepository.findAll();
    }

    public Event getEvent(long eventId){
        return eventRepository.findById(eventId);
    }

    public Long createEvent(Event event){
        return eventRepository.save(event).getId();
    }

	public List<Event> getEvents(User user) {
		return eventRepository.findByAdministrator(user);
	}
}