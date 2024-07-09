package edu.uh.nsm.cosc.eventmanager.controller;

import static org.hamcrest.CoreMatchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import edu.uh.nsm.cosc.eventmanager.model.History;
import edu.uh.nsm.cosc.eventmanager.model.Notification;
import edu.uh.nsm.cosc.eventmanager.service.HistoryService;
import edu.uh.nsm.cosc.eventmanager.service.NotificationService;

@WebMvcTest(controllers=HistoryController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
public class HistoryControllerIntegrationTest {
    @Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private HistoryService historyService;
	
	@Test
	void historyShouldReturnListOfHistory() throws Exception {
		List<History> histories = new ArrayList<>();
		History history = new History();
		history.setStatus("is Pending");
		histories.add(history);
		
		when(historyService.getHistories()).thenReturn(histories);
		
		this.mockMvc.perform(get("/histories")).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("is Pending")));
	}
	
	@Test
	void historyShouldReturnHistory() throws Exception {
		History history = new History();
		history.setId(1L);
		history.setStatus("is Pending");
		
		when(historyService.getHistory(1L)).thenReturn(history);
		
		this.mockMvc.perform(get("/history/1")).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("is Pending"))).andExpect(content().string(containsString("is")));
	}
}
