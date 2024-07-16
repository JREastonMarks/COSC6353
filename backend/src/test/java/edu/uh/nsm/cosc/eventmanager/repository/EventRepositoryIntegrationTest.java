package edu.uh.nsm.cosc.eventmanager.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.uh.nsm.cosc.eventmanager.model.Event;

@SpringBootTest
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
    void testEvent(){
        Event events = eventRepository.findEventById(1L);

        assertThat(events.getId()).isEqualTo(1L);

    }
}