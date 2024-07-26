package edu.uh.nsm.cosc.eventmanager.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import edu.uh.nsm.cosc.eventmanager.model.States;

@SpringBootTest
@Sql("/test-states.sql")
public class StatesRepositoryIntegrationTest {
	
	@Autowired
	private StatesRepository statesRepository;
	
	@Test
	void contextLoads() throws Exception {
		assertThat(statesRepository).isNotNull();
	}
	
	@Test
	void testStates() {
		List<States> states = statesRepository.findAll();
		
		assertThat(states.size()).isEqualTo(1);
	}

}
