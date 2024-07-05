package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

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
	
	@Size(min=0, max=1, message="Middle initial must be equal or less than 1 character")
	String middleInitial;

	@Size(min=1, max=100, message="Address must be greater than 1 and less than 100 characters")
	String address;

	@Size(min=0, max=100, message="Address2 must be less than 100 characters")
	String address2;

	@Size(min=1, max=100, message="City must be greater than 1 and less than 100 characters")
	String city;

	@Size(min=5, max=9, message="State must be greater than 5 and less than 9 characters")
	String zipcode;

	@Size(min=1, max=1, message="You must select a state")
    List<String> state;
	
	@Size(min=1, max=3, message="You must select from 1 to 3 skills")
    List<String> skills;

	@Size(min=0, max=255, message="Preferences must be less than 255 characters")
	String preferences;

	@Size(max=5, message="You can select up to 5 dates")
    List<String> selectedDates;
	
	@NotNull(message="Cell phone must not be null")
	String cellPhone;
	
	@NotNull(message="Work phone must not be null")
	String workPhone;
	
	@NotNull(message="Birthdate must not be null")
	Date birthdate;

	@NotNull(message="Sex must not be null")
	Sex sex;

	String password;

	@Email
	String email;

	public enum Sex {
		male, female
	}

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
	public Sex getSex() {
		return sex;
	}
	public void setSex(Sex sex) {
		this.sex = sex;
	}
	public Date getBirthdate() {
		return birthdate;
	}
	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getAddress2() {
		return address2;
	}
	public void setAddress2(String address2) {
		this.address2 = address2;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public List<String> getState() {
		return state;
	}
	public void setState(List<String> state) {
		this.state = state;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	public List<String> getSkills() {
		return skills;
	}
	public void setSkills(List<String> skills) {
		this.skills = skills;
	}
	public String getPreferences() {
		return preferences;
	}
	public void setPreferences(String preferences){
		this.preferences = preferences;
	}
	public List<String> getSelectedDates() {
        return selectedDates;
    }
    public void setSelectedDates(List<String> selectedDates) {
        this.selectedDates = selectedDates;
    }
	public String getPassword() {
		return password;
	}
	public void setPassword(String password){
		this.password = password;
	}
}
