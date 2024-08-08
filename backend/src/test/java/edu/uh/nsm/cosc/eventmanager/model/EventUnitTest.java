package edu.uh.nsm.cosc.eventmanager.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

@SpringBootTest
@Sql("/test-states.sql")
public class EventUnitTest{
    
    @Autowired
    private Validator validator;
    
    @Test
    public void testEventCreation() throws ParseException{
        SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");

        Event event = new Event();
        event.setId(1L);
        event.setName("Event Name");
        event.setDescription("Event Desc");
        event.setAddress("505 Main St");
        event.setAddress2(null);
        event.setCity("Houston");
        event.setZipcode("12345");
        event.setSkills(Arrays.asList(new Skill("Budgeting")));
        event.setUrgency("Low");
        event.setEventdate((Date) df.parseObject("2024-07-04"));
        States state = new States();
        state.setCode("TX");
        state.setState("Texas");
        event.setState(state);

        assertThat(event.getId()).isEqualTo(1L);
        assertThat(event.getName()).isEqualTo("Event Name");
        assertThat(event.getDescription()).isEqualTo("Event Desc");
        assertThat(event.getAddress()).isEqualTo("505 Main St");
        assertThat(event.getAddress2()).isEqualTo(null);
        assertThat(event.getCity()).isEqualTo("Houston");
        assertThat(event.getState().getCode()).isEqualTo("TX");
        assertThat(event.getState().getState()).isEqualTo("Texas");
        assertThat(event.getZipcode()).isEqualTo("12345");
        assertThat(event.getSkills().getFirst().getName()).isEqualTo("Budgeting");
        assertThat(event.getUrgency()).isEqualTo("Low");
        assertThat(event.getEventdate()).isEqualTo(df.parseObject("2024-07-04"));

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