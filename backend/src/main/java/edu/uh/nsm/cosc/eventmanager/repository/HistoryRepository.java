package edu.uh.nsm.cosc.eventmanager.repository;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.History;

@Service
public class HistoryRepository {
    
    public List<History> findAllByVolunteer(User volunteer) {
        return new ArrayList<History>();
    }

    public List<History> findAll() {
        User volunteer = new User();
        volunteer.setFirstName("firstV");
        volunteer.setMiddleInitial("V");
        volunteer.setLastName("lastV");

        Event event = new Event();
        event.setName("Event");
        event.setDesc("Test Description");
        event.setAddress("1st Rd");
        event.setAddress2(null);
        event.setCity("Houston");
        event.setState(Arrays.asList("Texas"));
        event.setZipcode("12345");
        event.setSkills(Arrays.asList("Database Management"));
        event.setUrgency(Arrays.asList("Low"));
        event.setDate(Date.from(Instant.now()));

        History history = new History();
        history.setId(1L);
        history.setVolunteer(volunteer);
        history.setEvent(event);
        history.setStatus("Finished");

        List<History> histories = new ArrayList<>();
        histories.add(history);

        return histories;
    }

    public History findHistoryById(long id) {
        User volunteer = new User();
        volunteer.setFirstName("firstV");
        volunteer.setMiddleInitial("V");
        volunteer.setLastName("lastV");

        Event event = new Event();
        event.setName("Event");
        event.setDesc("Test Description");
        event.setAddress("1st Rd");
        event.setAddress2(null);
        event.setCity("Houston");
        event.setState(Arrays.asList("Texas"));
        event.setZipcode("12345");
        event.setSkills(Arrays.asList("Database Management"));
        event.setUrgency(Arrays.asList("Low"));
        event.setDate(Date.from(Instant.now()));

        History history = new History();
        history.setId(1L);
        history.setVolunteer(volunteer);
        history.setEvent(event);
        history.setStatus("Finished");

        return history;
    }
}
