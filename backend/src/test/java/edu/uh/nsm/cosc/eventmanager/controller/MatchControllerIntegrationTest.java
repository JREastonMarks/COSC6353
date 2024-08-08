package edu.uh.nsm.cosc.eventmanager.controller;

import static org.hamcrest.CoreMatchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.model.Skill;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.service.MatchService;
import edu.uh.nsm.cosc.eventmanager.service.UserService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@WebMvcTest(controllers=MatchController.class)
public class MatchControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MatchService matchService;
    
    @MockBean
	private UserService userService;

    @Test
    @WithMockCustomUser
    void matchShouldReturnMatch() throws Exception{
        Event event = new Event();
        event.setSkills(Arrays.asList(new Skill("Database Management")));

        User volunteer = new User();
        volunteer.setSkills(Arrays.asList(new Skill("Database Management")));
        
        Match match = new Match();
        match.setId(1L);
        match.setMatch(volunteer.getSkills(), event.getSkills());

        when(matchService.getMatch(1L)).thenReturn(match);

        this.mockMvc.perform(get("/api/match/1")).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("1")));
    }
    
    @Test
    @WithMockCustomUser
    void listAllMatches() throws Exception{
        Event event = new Event();
        event.setSkills(Arrays.asList(new Skill("Database Management")));

        User volunteer = new User();
        volunteer.setSkills(Arrays.asList(new Skill("Database Management")));
        
        Match match = new Match();
        match.setId(1L);
        match.setMatch(volunteer.getSkills(), event.getSkills());
        
        List<Match> matches = new ArrayList<Match>();
        matches.add(match);

        when(matchService.getMatches(any())).thenReturn(matches);

        this.mockMvc.perform(get("/api/matches")).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("1")));
    }
}
