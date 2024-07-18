package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.service.EventService;

@RestController
@RequestMapping("/api")
public class EventController{
    private EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping(path="/events")
    List<Event> messages(){
        return eventService.getEvents();
    }

    @GetMapping(path="/event/{eventId}")
    Event message(@PathVariable(required=true) long eventId){
        return eventService.getEvent(eventId);
    }
}