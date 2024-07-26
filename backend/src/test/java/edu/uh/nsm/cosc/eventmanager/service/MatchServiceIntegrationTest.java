package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import java.util.Arrays;
import java.util.List;

import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.repository.UserRepository;
import edu.uh.nsm.cosc.eventmanager.repository.EventRepository;

@SpringBootTest
@Sql("/test-matches.sql")
public class MatchServiceIntegrationTest {
    @Autowired
    private MatchService matchService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Test
    void contextLoads() throws Exception{
        assertThat(matchService).isNotNull();
    }

    @Test
    void testMatches(){
        List<Match> matches = matchService.getMatches();

        assertThat(matches.size()).isEqualTo(1);
    }

    @Test 
    void testMatch(){
        Match matches = matchService.getMatch(1L);

        assertThat(matches.getId()).isEqualTo(1L);
    }

    @Test
    void createMatch(){
        User volunteer = userRepository.getReferenceById(1L);
        Event event = eventRepository.getReferenceById(1L);

        event.setSkills(Arrays.asList("Database Management"));
        volunteer.setSkills(Arrays.asList("Database Management"));
        
        Match match = new Match();
        match.setEvent(event);
        match.setUser(volunteer);
        match.setMatch(volunteer.getSkills(), event.getSkills());

        matchService.createMatch(match);

        List<Match> matches = matchService.getMatches();

        assertThat(matches.size()).isEqualTo(2);
    }
}
