package edu.uh.nsm.cosc.eventmanager.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

@SpringBootTest
public class EventUnitTest{
    
    @Autowired
    private Validator validator;
    
    @Test
    public void testEventCreation() throws ParseException{
        SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");

        Event event = new Event();
        event.setId(1L);
        event.setName("Event 1");
        event.setDesc("Event Desc");
        event.setAddress("505 Main St");
        event.setAddress2(null);
        event.setCity("Houston");
        event.setState(Arrays.asList("Texas"));
        event.setZipcode("12345");
        event.setSkills(Arrays.asList("Budgeting"));
        event.setUrgency(Arrays.asList("Low"));
        event.setDate((Date) df.parseObject("2024-07-04"));

        assertThat(event.getId()).isEqualTo(1L);
        assertThat(event.getName()).isEqualTo("Event 1");
        assertThat(event.getDesc()).isEqualTo("Event Desc");
        assertThat(event.getAddress()).isEqualTo("505 Main St");
        assertThat(event.getAddress2()).isEqualTo(null);
        assertThat(event.getCity()).isEqualTo("Houston");
        assertThat(event.getState()).isEqualTo(Arrays.asList("Texas"));
        assertThat(event.getZipcode()).isEqualTo("12345");
        assertThat(event.getSkills()).isEqualTo(Arrays.asList("Budgeting"));
        assertThat(event.getUrgency()).isEqualTo(Arrays.asList("Low"));
        assertThat(event.getDate()).isEqualTo(df.parseObject("2024-07-04"));
    }

    @Test
    public void validateEventName(){
        Event event = new Event();
        event.setId(1L);
        event.setName("");

        Set<ConstraintViolation<Event>> violations = validator.validate(event);

        assertThat(violations.size()).isGreaterThan(0);
    }
}