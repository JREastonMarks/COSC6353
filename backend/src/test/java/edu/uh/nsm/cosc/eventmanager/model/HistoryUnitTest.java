package edu.uh.nsm.cosc.eventmanager.model;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class HistoryUnitTest {

    @Test
    public void testHistoryCreation() {
        
        History history = new History();
        history.setId(1L);

        User volunteer = new User();
        volunteer.setId(2L);
        history.setVolunteer(volunteer);

        Event event = new Event();
        event.setId(3L);
        history.setEvent(event);

        history.setStatus("Finished");
        history.setPerformance("Excellent");

        assertThat(history.getId()).isEqualTo(1L);
        assertThat(history.getVolunteer().getId()).isEqualTo(2L);
        assertThat(history.getEvent().getId()).isEqualTo(3L);
        assertThat(history.getStatus()).isEqualTo("Finished");
        assertThat(history.getPerformance()).isEqualTo("Excellent");
    }
    
}
