package edu.uh.nsm.cosc.eventmanager.repository;

import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.model.User;

@Service
public class MatchRepository{
    
    public List<Match> findAllByEvent(Event event){
        return new ArrayList<Match>();
    }
    
    public Match matchBySkill(String skill){ 
        User volunteer = new User();
        volunteer.setFirstName("firstV");
        volunteer.setMiddleInitial("V");
        volunteer.setLastName("lastV");
        volunteer.setSkills(Arrays.asList("Database Management"));


        Event event = new Event();
        event.setName("Event");
        event.setDesc("Test Description");
        event.setAddress("1st Rd");
        event.setAddress2(null);
        event.setCity("Houston");
        event.setState(Arrays.asList("Texas"));
        event.setZipcode("12345");
        event.setSkills(Arrays.asList("Database Management"));
        event.setUrgency(Arrays.asList("Low"));
        event.setDate(Date.from(Instant.now()));

        Match match = new Match();

        match.setId(1L);
        match.setUser(volunteer);
        match.setEvent(event); 
        match.setMatch(volunteer.getSkills(), event.getSkills());

        return match;
    }
}