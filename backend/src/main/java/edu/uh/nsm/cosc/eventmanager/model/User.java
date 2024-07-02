package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class User implements Serializable {
	private static final long serialVersionUID = 8455135942008217481L;
	
	long id;
	
	@Size(min=1, max=255, message="First name must be greater than 1 and less than 255 characters")
	String firstName;
	
	@Size(min=1, max=255, message="Last name must be greater than 1 and less than 255 characters")
	String lastName;
	
	@Size(min=0, max=1, message="Middle initial must be less than 1 character")
	String middleInitial;
	
	@NotNull(message="Cell phone must not be null")
	String cellPhone;
	
	@NotNull(message="Work phone must not be null")
	String workPhone;
	
	@Email
	String email;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getMiddleInitial() {
		return middleInitial;
	}
	public void setMiddleInitial(String middleInitial) {
		this.middleInitial = middleInitial;
	}
	public String getCellPhone() {
		return cellPhone;
	}
	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}
	public String getWorkPhone() {
		return workPhone;
	}
	public void setWorkPhone(String workPhone) {
		this.workPhone = workPhone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
