package edu.uh.nsm.cosc.eventmanager.controller;

import static org.hamcrest.CoreMatchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.service.MatchService;

import java.util.Arrays;

@WebMvcTest(controllers=MatchController.class, excludeAutoConfiguration=SecurityAutoConfiguration.class)
public class MatchControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MatchService matchService;

    @Test
    void matchShouldReturnMatch() throws Exception{
        Event event = new Event();
        event.setSkills(Arrays.asList("Database Management"));

        User volunteer = new User();
        volunteer.setSkills(Arrays.asList("Database Management"));
        
        Match match = new Match();
        match.setId(1L);
        match.setMatch(volunteer.getSkills(), event.getSkills());

        when(matchService.getMatch(1L)).thenReturn(match);

        this.mockMvc.perform(get("/api/match/1")).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("1")));
    }
}
