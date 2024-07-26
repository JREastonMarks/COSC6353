package edu.uh.nsm.cosc.eventmanager.repository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.model.User;

@SpringBootTest
@Sql("/test-matches.sql")
public class MatchRepositoryIntegrationTest {
    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Test
    void contextLoads() throws Exception{
        assertThat(matchRepository).isNotNull();
    }

    @Test
    void testMatches(){
        List<Match> matches = matchRepository.findAll();

        assertThat(matches.size()).isEqualTo(1);
    }

    @Test
    void createMatch(){
        User volunteer = userRepository.getReferenceById(1L);
        Event event = eventRepository.getReferenceById(1L);
        
        //event.setSkills(Arrays.asList("Database Management"));
        //volunteer.setSkills(Arrays.asList("Database Management"));

        Match match = new Match();
        match.setEvent(event);
        match.setUser(volunteer);
        match.setMatch(volunteer.getSkills(), event.getSkills());

        matchRepository.save(match);

        List<Match> matches = matchRepository.findAll();

        assertThat(matches.size()).isEqualTo(2);
    }
}
