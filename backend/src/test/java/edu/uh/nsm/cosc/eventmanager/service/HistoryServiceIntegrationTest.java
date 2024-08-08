package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import edu.uh.nsm.cosc.eventmanager.model.History;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.repository.EventRepository;
import edu.uh.nsm.cosc.eventmanager.repository.UserRepository;

@SpringBootTest
@Sql("/test-histories.sql")
public class HistoryServiceIntegrationTest {
    @Autowired
	private HistoryService historyService;

	@Autowired
	private UserRepository userRepository;

	@Autowired 
	private EventRepository eventRepository;
	
	@Test
	void contextLoads() throws Exception {
		assertThat(historyService).isNotNull();
	}
	
	@Test
	void testHistories() {
		List<History> histories = historyService.getHistories();
		
		assertThat(histories.size()).isEqualTo(1);
	}
	
	@Test
	void testHistory() {
		History history = historyService.getHistory(1L);
		
		assertThat(history.getId()).isEqualTo(1L);
	}
	
	@Test
	void testUserHistory() {
		User user = userRepository.findById(10L);
		List<History> histories = historyService.getHistories(user);
		
		assertThat(histories.size()).isEqualTo(1);
	}

	@Test
	void createHistory(){
		User volunteer = userRepository.findById(10L);
		Event event = eventRepository.findById(1L);

		History history = new History();
		history.setVolunteer(volunteer);
		history.setEvent(event);
		history.setStatus("Active");
		history.setPerformance("Excellent");

		historyService.createHistory(history);

		List<History> histories = historyService.getHistories();

		assertThat(histories.size()).isEqualTo(2);
	}
}
