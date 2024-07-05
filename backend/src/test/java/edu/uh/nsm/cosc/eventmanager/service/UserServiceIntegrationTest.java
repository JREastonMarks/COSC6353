package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.uh.nsm.cosc.eventmanager.model.User;

@SpringBootTest
public class UserServiceIntegrationTest {

	@Autowired
	private UserService userService;
	
	@Test
	void contextLoads() throws Exception {
		assertThat(userService).isNotNull();
	}

	@Test
	void testUser() {
		User user = userService.getUser(1L);
		
		assertThat(user.getId()).isEqualTo(1L);
	}
}