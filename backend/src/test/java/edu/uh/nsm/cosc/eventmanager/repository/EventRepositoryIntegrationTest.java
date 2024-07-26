package edu.uh.nsm.cosc.eventmanager.repository;

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
public class EventRepositoryIntegrationTest{
    
    @Autowired
    private EventRepository eventRepository;
    
    @Test
    void contextLoads() throws Exception{
        assertThat(eventRepository).isNotNull();
    }

    @Test
    void testEvents(){
        List<Event> events = eventRepository.findAll();
        
        assertThat(events.size()).isEqualTo(1);
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

        eventRepository.save(event);

        List<Event> events = eventRepository.findAll();
        assertThat(events.size()).isEqualTo(2);
    }
}