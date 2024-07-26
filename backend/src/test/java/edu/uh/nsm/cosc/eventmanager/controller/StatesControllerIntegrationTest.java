package edu.uh.nsm.cosc.eventmanager.controller;

import static org.hamcrest.CoreMatchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import edu.uh.nsm.cosc.eventmanager.model.States;
import edu.uh.nsm.cosc.eventmanager.service.StatesService;

@WebMvcTest(controllers=StatesController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
public class StatesControllerIntegrationTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private StatesService statesService;
	
	@Test
	void statesShouldReturnListOfStates() throws Exception {
		List<States> states = new ArrayList<>();
		States state = new States();
		state.setState("Texas");
		states.add(state);
		
		when(statesService.getStates()).thenReturn(states);
		
		this.mockMvc.perform(get("/api/states")).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("Texas")));
	}
	
	@Test
	void stateShouldReturnState() throws Exception {
		States state = new States();
		state.setCode("TX");
		state.setState("Texas");
		
		when(statesService.getState("TX")).thenReturn(state);
		
		this.mockMvc.perform(get("/api/state/TX")).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("Texas")));
	}
}
