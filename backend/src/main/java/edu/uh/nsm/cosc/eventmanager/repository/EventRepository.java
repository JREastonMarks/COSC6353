package edu.uh.nsm.cosc.eventmanager.repository;

import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.Event;

@Service
public class EventRepository{
    
    public List<Event> findAll(){
        Event event = new Event();
        event.setId(1L);
        event.setName("Event Name");
        event.setDesc("Event Desc");
        event.setAddress("505 Main St");
        event.setAddress2(null);
        event.setCity("Houston");
        event.setState(Arrays.asList("Texas"));
        event.setZipcode("12345");
        event.setSkills(Arrays.asList("Budgeting"));
        event.setUrgency(Arrays.asList("Low"));
        try {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");
            Date date = df.parse("2024-07-04");
            event.setDate(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        List<Event> events = new ArrayList<>();
        events.add(event);
        return events;
    }

    public Event findEventById(long id){
        Event event = new Event();
        event.setId(1L);
        event.setName("Event Name");
        event.setDesc("Event Desc");
        event.setAddress("505 Main St");
        event.setAddress2(null);
        event.setCity("Houston");
        event.setState(Arrays.asList("Tx"));
        event.setZipcode("12345");
        event.setSkills(Arrays.asList("Budgeting"));
        event.setUrgency(Arrays.asList("Low"));
        try {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");
            Date date = df.parse("2024-07-04");
            event.setDate(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return event;
    }
}