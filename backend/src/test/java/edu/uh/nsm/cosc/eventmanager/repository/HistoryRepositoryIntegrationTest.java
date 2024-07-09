package edu.uh.nsm.cosc.eventmanager.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.uh.nsm.cosc.eventmanager.model.History;
import edu.uh.nsm.cosc.eventmanager.model.Notification;

@SpringBootTest
public class HistoryRepositoryIntegrationTest {
    
    @Autowired
    private HistoryRepository historyRepository;

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
	void testHistory() {
		History history = historyRepository.findHistoryById(1L);
		
		assertThat(history.getId()).isEqualTo(1L);
	}
}
