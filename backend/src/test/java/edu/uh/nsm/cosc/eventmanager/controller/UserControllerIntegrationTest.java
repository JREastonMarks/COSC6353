package edu.uh.nsm.cosc.eventmanager.controller;

import static org.hamcrest.CoreMatchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.service.UserService;

@WebMvcTest(controllers=UserController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
public class UserControllerIntegrationTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private UserService userService;
	
	@Test
	void userShouldReturnInformation() throws Exception {
		User user = new User();
		user.setId(1L);
		user.setFirstName("First Name");
		
		when(userService.getUser(1L)).thenReturn(user);
		
		this.mockMvc.perform(get("/api/user/1")).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("First Name"))).andExpect(content().string(containsString("Name")));
	}
}
