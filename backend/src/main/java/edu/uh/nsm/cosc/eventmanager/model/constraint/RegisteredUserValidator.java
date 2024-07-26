package edu.uh.nsm.cosc.eventmanager.model.constraint;

import edu.uh.nsm.cosc.eventmanager.model.User;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class RegisteredUserValidator implements ConstraintValidator<ValidRegistration, User> {

	@Override
	public boolean isValid(User value, ConstraintValidatorContext context) {
		if(!value.isRegistered()) {
			return true;
		}
		if (value.getSex() == null) {
			return false;
		}
		if (value.getCellPhone() == null) {
			return false;
		}
		if (value.getWorkPhone() == null) {
			return false;
		}
		if (value.getBirthdate() == null) {
			return false;
		}
		
		return true;
	}
	

}
