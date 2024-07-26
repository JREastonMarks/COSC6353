package edu.uh.nsm.cosc.eventmanager.model;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class StatesUnitTest {
    @Test
	public void testStatesCreation() {
		States states = new States();
        states.setCode("TX");
		states.setState("Texas");
		
		assertThat(states.getCode()).isEqualTo("TX");
		assertThat(states.getState()).isEqualTo("Texas");
	}
}
