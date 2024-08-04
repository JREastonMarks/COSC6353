package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import edu.uh.nsm.cosc.eventmanager.model.constraint.ValidRegistration;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@ValidRegistration
public class User implements Serializable {
	private static final long serialVersionUID = 8455135942008217481L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	
	@Email
	@Column(unique= true)
	String username;
	
	String password;
	
	private String role;
	
	private boolean registered;
	
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

	@ManyToOne
	@JoinColumn(name = "state", referencedColumnName = "code")
    States state;
	
	@ManyToMany(fetch=FetchType.EAGER)
	@Size(min=1, max=3, message="You must select from 1 to 3 skills")
    List<Skill> skills;

	@Size(min=0, max=255, message="Preferences must be less than 255 characters")
	String preferences;

	@Size(max=5, message="You can select up to 5 dates")
    List<Date> selectedDates;
	
	String cellPhone;
	
	String workPhone;
	
	Date birthdate;

	Sex sex;

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
	public States getState() {
		return state;
	}
	public void setState(States state) {
		this.state = state;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	public List<Skill> getSkills() {
		return skills;
	}
	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}
	public String getPreferences() {
		return preferences;
	}
	public void setPreferences(String preferences){
		this.preferences = preferences;
	}
	public List<Date> getSelectedDates() {
        return selectedDates;
    }
    public void setSelectedDates(List<Date> selectedDates) {
        this.selectedDates = selectedDates;
    }
	public String getPassword() {
		return password;
	}
	public void setPassword(String password){
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public boolean isRegistered() {
		return registered;
	}
	public void setRegistered(boolean registered) {
		this.registered = registered;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
}
