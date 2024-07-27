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
import edu.uh.nsm.cosc.eventmanager.model.Skill;
import edu.uh.nsm.cosc.eventmanager.model.States;

@SpringBootTest
@Sql("/test-events.sql")
public class EventRepositoryIntegrationTest{
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private SkillRepository skillRepository;
    
    
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
        event.setDescription("Event Description");
        event.setAddress("101 Main St");
        event.setAddress2(null);
        event.setCity("Houston");
        event.setZipcode("12345");
        
        
        
        event.setUrgency("Low");
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
        
        Skill skill = skillRepository.findByName("Database Management");
        
        event.setSkills(Arrays.asList(skill));
        eventRepository.save(event);

        List<Event> events = eventRepository.findAll();
        assertThat(events.size()).isEqualTo(2);
    }
}