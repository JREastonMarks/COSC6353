package edu.uh.nsm.cosc.eventmanager.model;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;

import java.text.ParseException;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MatchUnitTest {
    @Test
    public void testMatchCreation() throws ParseException{
        Match match = new Match();
        match.setId(1L);

        User volunteer = new User();
        volunteer.setId(2L);
        volunteer.setSkills(Arrays.asList("Database Manager"));
        match.setUser(volunteer);
        

        Event event = new Event();
        event.setId(3L);
        event.setSkills(Arrays.asList("Database Manager"));
        match.setEvent(event);

        match.setMatch(volunteer.getSkills(), event.getSkills());

        assertThat(match.getId()).isEqualTo(1L);
        assertThat(match.getUser().getId()).isEqualTo(2L);
        assertThat(match.getEvent().getId()).isEqualTo(3L);
        assertThat(match.getMatch()).isEqualTo(true);
    }
}
