package edu.uh.nsm.cosc.eventmanager.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.uh.nsm.cosc.eventmanager.model.Match;

@SpringBootTest
public class MatchRepositoryIntegrationTest {
    @Autowired
    private MatchRepository matchRepository;
    
    @Test
    void contextLoads() throws Exception{
        assertThat(matchRepository).isNotNull();
    }

    @Test
    void testMatch(){
        Match match = matchRepository.matchBySkill("Database Management");

        assertThat(match.getMatch()).isEqualTo(true);
    }
}
