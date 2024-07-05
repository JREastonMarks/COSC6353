package edu.uh.nsm.cosc.eventmanager.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.uh.nsm.cosc.eventmanager.model.User;

@SpringBootTest
public class UserRepositoryIntegrationTest {
	
	@Autowired
	private UserRepository userRepository;
	
	@Test
	void contextLoads() throws Exception {
		assertThat(userRepository).isNotNull();
	}

	@Test
	void testNotification() {
		User user = userRepository.userInformationById(1L);
		
		assertThat(user.getId()).isEqualTo(1L);
	}
}
