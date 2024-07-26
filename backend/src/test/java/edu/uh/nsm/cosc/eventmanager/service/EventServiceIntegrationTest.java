package edu.uh.nsm.cosc.eventmanager.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.States;

@SpringBootTest
@Sql("/test-events.sql")
public class EventServiceIntegrationTest{
    
    @Autowired
    private EventService eventService;

    @Test
    void contextLoads() throws Exception{
        assertThat(eventService).isNotNull();
    }

    @Test
    void testEvents(){
        List<Event> events = eventService.getEvents();

        assertThat(events.size()).isEqualTo(1);
    }

    @Test
    void testEvent(){
        Event event = eventService.getEvent(1L);

        assertThat(event.getId()).isEqualTo(1L);
    }

    @Test
    void createEvent(){
        Event event = new Event();
        event.setName("Test Event");
        event.setDesc("Event Description");
        event.setAddress("101 Main St");
        event.setAddress2(null);
        event.setCity("Houston");
        event.setZipcode("12345");
        event.setSkills(Arrays.asList("Database Management"));
        event.setUrgency(Arrays.asList("Low"));
        try {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");
            Date date = df.parse("2024-07-23");
            event.setDate(date);
        } 
        catch (ParseException e) {
            e.printStackTrace();
        }

        States state = new States();
        state.setCode("TX");
        state.setState("Texas"); 

        eventService.createEvent(event);

        List<Event> events = eventService.getEvents();
        assertThat(events.size()).isEqualTo(2);
    }
}