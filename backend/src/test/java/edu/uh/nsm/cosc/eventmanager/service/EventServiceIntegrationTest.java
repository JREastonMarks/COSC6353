package edu.uh.nsm.cosc.eventmanager.service;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.uh.nsm.cosc.eventmanager.model.Event;

@SpringBootTest
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
}