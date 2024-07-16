package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.uh.nsm.cosc.eventmanager.model.Match;

@SpringBootTest
public class MatchServiceIntegrationTest {
    @Autowired
    private MatchService matchService;

    @Test
    void contextLoads() throws Exception{
        assertThat(matchService).isNotNull();
    }

    @Test
    void testMatches(){
        List<Match> matches = matchService.getMatchByEvent(Event event);

        assertThat(matches.size()).isEqualTo(1);
    }

    @Test
    void testMatch(){
        Match match = matchService.getMatchBySkill(String skill);

        assertThat(match.getMatch()).isEqualTo(true);
    }
}
