package edu.uh.nsm.cosc.eventmanager.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import edu.uh.nsm.cosc.eventmanager.service.ReportService;

@WebMvcTest(controllers=ReportController.class)
public class ReportControllerIntegrationTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ReportService reportService;
	
	
	@Test
	@WithMockCustomUser
	void testGetEventReport() throws Exception {
		
		this.mockMvc.perform(get("/api/eventReport?format=PDF&eventId=1")).andDo(print()).andExpect(status().isOk());
		
		this.mockMvc.perform(get("/api/eventReport?format=CSV&eventId=1")).andDo(print()).andExpect(status().isOk());
		
		 
//		this.mockMvc.perform(get("/api/eventReport?format=BAD&eventId=1")).andDo(print()).andExpect(status().isInternalServerError());
	}
	
	@Test
	@WithMockCustomUser
	void testGetVolunteerReport() throws Exception {
		
		this.mockMvc.perform(get("/api/volunteerReport?format=PDF&userId=1")).andDo(print()).andExpect(status().isOk());
		
		this.mockMvc.perform(get("/api/volunteerReport?format=CSV&userId=1")).andDo(print()).andExpect(status().isOk());
		
		 
//		this.mockMvc.perform(get("/api/volunteerReport?format=BAD&eventId=1")).andDo(print()).andExpect(status().isInternalServerError());
	}
	

}
