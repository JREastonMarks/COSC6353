package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.uh.nsm.cosc.eventmanager.model.History;

@SpringBootTest
public class HistoryServiceIntegrationTest {
    @Autowired
	private HistoryService historyService;
	
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
}
