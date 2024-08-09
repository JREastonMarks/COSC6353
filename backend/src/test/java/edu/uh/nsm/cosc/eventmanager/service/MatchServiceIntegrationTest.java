package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import java.util.Arrays;
import java.util.List;

import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.model.Skill;
import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.repository.UserRepository;
import edu.uh.nsm.cosc.eventmanager.repository.EventRepository;
import edu.uh.nsm.cosc.eventmanager.repository.SkillRepository;

@SpringBootTest
@Sql("/test-matches.sql")
public class MatchServiceIntegrationTest {
    @Autowired
    private MatchService matchService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private SkillRepository skillRepository;

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
    void testUserMatches(){
    	User volunteer = userRepository.findById(1L);
        List<Match> matches = matchService.getMatches(volunteer);

        assertThat(matches.size()).isEqualTo(1);
    }

    @Test 
    void testMatch(){
        Match matches = matchService.getMatch(1L);

        assertThat(matches.getId()).isEqualTo(1L);
    }

    @Test
    void createMatch(){
    	Skill skill = skillRepository.findByName("Java Development");
    	
    	
        User volunteer = userRepository.findById(1L);
        Event event = eventRepository.findById(2L);

        event.setSkills(Arrays.asList(skill));
        volunteer.setSkills(Arrays.asList(skill));
        
        Match match = new Match();
        match.setEvent(event);
        match.setVolunteer(volunteer);

        matchService.createMatch(match);

        List<Match> matches = matchService.getMatches();

        assertThat(matches.size()).isEqualTo(2);
    }
}
