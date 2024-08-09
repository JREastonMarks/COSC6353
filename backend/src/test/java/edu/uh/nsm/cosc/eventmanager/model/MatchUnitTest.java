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
        volunteer.setSkills(Arrays.asList(new Skill("Database Manager")));
        match.setVolunteer(volunteer);
        

        Event event = new Event();
        event.setId(3L);
        event.setSkills(Arrays.asList(new Skill("Database Manager")));
        match.setEvent(event);


        assertThat(match.getId()).isEqualTo(1L);
        assertThat(match.getVolunteer().getId()).isEqualTo(2L);
        assertThat(match.getEvent().getId()).isEqualTo(3L);
    }
}
