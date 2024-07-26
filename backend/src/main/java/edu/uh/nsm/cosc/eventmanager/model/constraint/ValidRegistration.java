package edu.uh.nsm.cosc.eventmanager.model.constraint;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = RegisteredUserValidator.class)
@Target( { TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidRegistration {
    String message() default "Invalid Registration";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}