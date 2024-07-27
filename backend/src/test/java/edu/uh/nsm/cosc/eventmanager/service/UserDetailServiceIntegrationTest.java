package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.jdbc.Sql;

import edu.uh.nsm.cosc.eventmanager.model.User;

@SpringBootTest
@Sql("/test-users.sql")
public class UserDetailServiceIntegrationTest {
	@Autowired
	private UserDetailService userDetailService;
	@Autowired
	private UserService userService;
	
	@Test
	void contextLoads() throws Exception {
		assertThat(userDetailService).isNotNull();
	}
	
	@Test
	void loadUserByUsername() {
		User user = new User();
		user.setUsername("testUser@test.com");
		user.setPassword("password");
		userService.registerUser(user);
		
		UserDetails userDetails = userDetailService.loadUserByUsername("testUser@test.com");
		
		assertThat(userDetails.getUsername()).isEqualTo("testUser@test.com");
		
	}
	
	@Test
	void loadUserByUsernameNull() {
		assertThrows(UsernameNotFoundException.class, () -> {userDetailService.loadUserByUsername("notAuser@test.com");});
		
	}
}
