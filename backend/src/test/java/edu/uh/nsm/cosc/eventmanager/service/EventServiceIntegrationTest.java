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
import edu.uh.nsm.cosc.eventmanager.model.Skill;
import edu.uh.nsm.cosc.eventmanager.model.States;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.repository.SkillRepository;
import edu.uh.nsm.cosc.eventmanager.repository.UserRepository;

@SpringBootTest
@Sql("/test-events.sql")
public class EventServiceIntegrationTest{
    
    @Autowired
    private EventService eventService;
    
    @Autowired
    private SkillRepository skillRepository;
    
    @Autowired
    private UserRepository userRepository;

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
    void testUserEvents(){
    	User user = userRepository.findById(1L);
        List<Event> events = eventService.getEvents(user);

        assertThat(events.size()).isEqualTo(1);
    }
    

    @Test
    void testEvent(){
        Event event = eventService.getEvent(1L);

        assertThat(event.getId()).isEqualTo(1L);
    }

    @Test
    void createEvent(){
    	
    	Skill skill = skillRepository.findById(1L).get();
    	
        Event event = new Event();
        event.setName("Test Event");
        event.setDescription("Event Description");
        event.setAddress("101 Main St");
        event.setAddress2(null);
        event.setCity("Houston");
        event.setZipcode("12345");
        event.setSkills(Arrays.asList(skill));
        event.setUrgency("Low");
        event.setAdministrator(userRepository.findById(1L));
        try {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");
            Date date = df.parse("2024-07-23");
            event.setEventdate(date);
        } 
        catch (ParseException e) {
            e.printStackTrace();
        }

        States state = new States();
        state.setCode("TX");
        state.setState("Texas"); 
        
        event.setState(state);

        eventService.createEvent(event);

        List<Event> events = eventService.getEvents();
        assertThat(events.size()).isEqualTo(2);
    }
}