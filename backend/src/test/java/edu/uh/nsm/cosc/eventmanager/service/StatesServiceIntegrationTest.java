package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import edu.uh.nsm.cosc.eventmanager.model.Notification;
import edu.uh.nsm.cosc.eventmanager.model.States;

@SpringBootTest
@Sql("/test-states.sql")
public class StatesServiceIntegrationTest {

	@Autowired
	private StatesService statesService;
	
	@Test
	void contextLoads() throws Exception {
		assertThat(statesService).isNotNull();
	}
	
	@Test
	void testStates() {
		List<States> states = statesService.getStates();
		
		assertThat(states.size()).isEqualTo(1);
	}
	
	@Test
	void testState() {
		States state = statesService.getState("TX");
		
		assertThat(state.getCode()).isEqualTo("TX");
	}
	
	
}