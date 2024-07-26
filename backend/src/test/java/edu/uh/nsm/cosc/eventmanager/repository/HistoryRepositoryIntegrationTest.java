package edu.uh.nsm.cosc.eventmanager.repository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.History;
import edu.uh.nsm.cosc.eventmanager.model.User;

@SpringBootTest
@Sql("/test-histories.sql")
public class HistoryRepositoryIntegrationTest {
    @Autowired
    private HistoryRepository historyRepository;

	@Autowired 
	private UserRepository userRepository;

	@Autowired 
	private EventRepository eventRepository;

    @Test
    void contextLoads() throws Exception {
		assertThat(historyRepository).isNotNull();
	}

    @Test
    void testHistories() {
		List<History> histories = historyRepository.findAll();
		
		assertThat(histories.size()).isEqualTo(1);
	}
	
	@Test
	void createHistory() {
		User volunteer = userRepository.getReferenceById(1L);
		Event event = eventRepository.getReferenceById(1L);
		History history = new History();

		//history.setVolunteer(volunteer);
		history.setEvent(event);
		history.setStatus("Active");

		historyRepository.save(history);

		List<History> histories = historyRepository.findAll();

		assertThat(histories.size()).isEqualTo(2);
	}
}