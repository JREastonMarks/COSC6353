package edu.uh.nsm.cosc.eventmanager.repository;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.model.Skill;
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
    
    @Autowired
    private SkillRepository skillRepository;
    
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
        User volunteer = userRepository.findById(1L);
        Event event = eventRepository.findById(1L);
        
        Skill skill = skillRepository.findById(1L).get();
        
        event.setSkills(Arrays.asList(skill));
        volunteer.setSkills(Arrays.asList(skill));

        Match match = new Match();
        match.setEvent(event);
        match.setVolunteer(volunteer);

        matchRepository.save(match);

        List<Match> matches = matchRepository.findAll();

        assertThat(matches.size()).isEqualTo(2);
    }
}
