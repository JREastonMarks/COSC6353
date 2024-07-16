package edu.uh.nsm.cosc.eventmanager.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.text.ParseException;
import java.util.Arrays;
import java.util.Set;
import java.text.SimpleDateFormat;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

import edu.uh.nsm.cosc.eventmanager.model.User.Sex;


@SpringBootTest
public class UserUnitTest {
	
	@Autowired
	private Validator validator;
	
	@Test
	public void testUserCreation() throws ParseException {
		SimpleDateFormat birthdate = new SimpleDateFormat("yyyy-MM-dd");

		User user = new User();
		user.setId(1L);
		user.setFirstName("first");
		user.setMiddleInitial("i");
		user.setLastName("last");
		user.setBirthdate(birthdate.parse("2005-05-05"));
		user.setCellPhone("555-555-5555");
		user.setWorkPhone("222-222-2222");
		user.setSex(Sex.female);
		user.setAddress("1 1st Rd");
        user.setAddress2(null);
        user.setCity("Houston");
        user.setState(Arrays.asList("Texas"));
        user.setZipcode("10000");
        user.setSkills(Arrays.asList("Database Management"));
        user.setPreferences(null);
        user.setSelectedDates(Arrays.asList(
            "2025-07-01", "2025-07-02", "2025-07-03", "2025-07-04", "2025-07-05"
        ));
		user.setEmail("test@eventmanager.org");
		user.setPassword("testpass");
		
		assertThat(user.getId()).isEqualTo(1L);
		assertThat(user.getFirstName()).isEqualTo("first");
		assertThat(user.getMiddleInitial()).isEqualTo("i");
		assertThat(user.getLastName()).isEqualTo("last");
		assertThat(user.getBirthdate()).isEqualTo(birthdate.parseObject("2005-05-05"));
		assertThat(user.getSex()).isEqualTo(Sex.female);
		assertThat(user.getAddress()).isEqualTo("1 1st Rd");
		assertThat(user.getAddress2()).isEqualTo(null);
		assertThat(user.getCity()).isEqualTo("Houston");
		assertThat(user.getState()).isEqualTo(Arrays.asList("Texas"));
		assertThat(user.getZipcode()).isEqualTo("10000");
		assertThat(user.getSkills()).isEqualTo(Arrays.asList("Database Management"));
		assertThat(user.getPreferences()).isEqualTo(null);
		assertThat(user.getSelectedDates()).isEqualTo(Arrays.asList(
            "2025-07-01", "2025-07-02", "2025-07-03", "2025-07-04", "2025-07-05"
        ));
		assertThat(user.getCellPhone()).isEqualTo("555-555-5555");
		assertThat(user.getWorkPhone()).isEqualTo("222-222-2222");
		assertThat(user.getEmail()).isEqualTo("test@eventmanager.org");
		assertThat(user.getPassword()).isEqualTo("testpass");
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