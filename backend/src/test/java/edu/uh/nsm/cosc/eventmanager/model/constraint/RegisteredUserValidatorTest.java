package edu.uh.nsm.cosc.eventmanager.model.constraint;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.model.User.Sex;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

@SpringBootTest
public class RegisteredUserValidatorTest {
	@Autowired
    private Validator validator;
	
	@Test
	public void testUser() {
		User user = new User();
		user.setRegistered(false);
		
		Set<ConstraintViolation<User>> violations = validator.validate(user);
		
		assertThat(violations.size()).isEqualTo(0);
		
		user.setRegistered(true);
		violations = validator.validate(user);
		assertThat(violations.size()).isGreaterThan(0);
		
		user.setSex(Sex.male);
		violations = validator.validate(user);
		assertThat(violations.size()).isGreaterThan(0);
		
		user.setCellPhone("555-555-5555");
		violations = validator.validate(user);
		assertThat(violations.size()).isGreaterThan(0);
		
		user.setWorkPhone("222-222-2222");
		violations = validator.validate(user);
		assertThat(violations.size()).isGreaterThan(0);
		
		user.setBirthdate(Date.from(Instant.now()));
		violations = validator.validate(user);
		
		assertThat(violations.size()).isEqualTo(0);
	}
}
