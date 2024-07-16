package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.containsString;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.service.EventService;

@WebMvcTest(controllers=EventController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
public class EventControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EventService eventService;

    @Test
    void eventShouldReturnListOfEvents() throws Exception {
        List<Event> events = new ArrayList<>();
        Event event = new Event();
        event.setName("Event 1");
        events.add(event);

        when(eventService.getEvents()).thenReturn(events);

        this.mockMvc.perform(get("/events")).andDo(print()).andExpect(content().string(containsString("Event 1")));
    }
    
    @Test
    void eventShouldReturnEvent() throws Exception {
        Event event = new Event();
        event.setId(1L);
        event.setName("Event 1");

        when(eventService.getEvent(1L)).thenReturn(event);
        this.mockMvc.perform(get("/event/1")).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("Event 1"))).andExpect(content().string(containsString("1")));
    }
}