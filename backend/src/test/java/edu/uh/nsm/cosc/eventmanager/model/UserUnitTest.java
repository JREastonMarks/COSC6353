package edu.uh.nsm.cosc.eventmanager.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

@SpringBootTest
public class UserUnitTest {
	
	@Autowired
	private Validator validator;
	
	@Test
	public void testUserCreation() {
		User user = new User();
		user.setId(1L);
		user.setFirstName("first");
		user.setMiddleInitial("i");
		user.setLastName("last");
		user.setCellPhone("555-555-5555");
		user.setWorkPhone("222-222-2222");
		user.setEmail("test@eventmanager.org");
		
		assertThat(user.getId()).isEqualTo(1L);
		assertThat(user.getFirstName()).isEqualTo("first");
		assertThat(user.getMiddleInitial()).isEqualTo("i");
		assertThat(user.getLastName()).isEqualTo("last");
		assertThat(user.getCellPhone()).isEqualTo("555-555-5555");
		assertThat(user.getWorkPhone()).isEqualTo("222-222-2222");
		assertThat(user.getEmail()).isEqualTo("test@eventmanager.org");
	}
	
	@Test
	public void validateFirstName() {
		User user = new User();
		user.setId(1L);
		user.setFirstName("");
		
		Set<ConstraintViolation<User>> violations = validator.validate(user);
		
		assertThat(violations.size()).isGreaterThan(0); 
	}
}
