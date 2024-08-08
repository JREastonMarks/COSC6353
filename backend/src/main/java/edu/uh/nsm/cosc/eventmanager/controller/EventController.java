package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.service.EventService;
import edu.uh.nsm.cosc.eventmanager.service.UserService;


@RestController
@RequestMapping("/api")
public class EventController{
    private EventService eventService;
    private UserService userService;
    
    public EventController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
    }
    
    @GetMapping(path="/events")
    List<Event> eventsByUser(@AuthenticationPrincipal UserDetails userDetails){
    	User user = userService.findUserByUsername(userDetails.getUsername());
    	
        return eventService.getEvents(user);
    }

    @GetMapping(path="/event/{eventId}")
    Event event(@PathVariable(required=true) long eventId){
        return eventService.getEvent(eventId);
    }

    @PostMapping(path="/event")
    void createEvent(Event event){
        eventService.createEvent(event);
    }  
}