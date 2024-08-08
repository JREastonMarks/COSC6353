package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Event implements Serializable{
    private static final long serialVersionUID=123456789;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    @Size(min=1, max=100, message="Event name must be greater than one and less than 100")
    String name;

    @NotNull(message="Event description must not be null")
    String description;

    @Size(min=1, max=100, message="Event address must be greater than 1 and less than 100 characters")
    String address;

    @Size(min=0, max=100, message="Event address2 must be less than 100")
    String address2;

    @Size(min=1, max=100, message="City must be greater than one and less than 100")
    String city;

    @ManyToOne
    @JoinColumn(name = "state", referencedColumnName="code")
    States state;

    @Size(min=5, max=9, message="Zipcode must be between 5 and 9")
    String zipcode;

    @ManyToMany(fetch = FetchType.EAGER)
    @Size(min=1, message="Event skills must not be null")
    List<Skill> skills;

    @NotNull(message="Event urgency must not be null")
    String urgency;
    
    @NotNull(message="Date must not be null")
    Date eventdate;

    @ManyToMany(fetch = FetchType.EAGER)
    @Size(min=1, message="Event volunteers must not be null")
    List<User> volunteers;
    
    @ManyToOne
    User administrator;


    public long getId(){
        return id;
    }

    public void setId(long id){
        this.id=id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name=name;
    }



    public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAddress(){
        return address;
    }

    public void setAddress(String address){
        this.address=address;
    }

    public String getAddress2(){
        return address2;
    }

    public void setAddress2(String address2){
        this.address2=address2;
    }

    public String getCity(){
        return city;
    }

    public void setCity(String city){
        this.city=city;
    }

    public States getState(){
        return state;
    }

    public void setState(States state){
        this.state=state;
    }

    public String getZipcode(){
        return zipcode;
    }

    public void setZipcode(String zipcode){
        this.zipcode=zipcode;
    }

    public List<Skill> getSkills(){
        return skills;
    }
    
    public void setSkills(List<Skill> skills){
        this.skills=skills;
    }

    public String getUrgency(){
        return urgency;
    }

    public void setUrgency(String urgency){
        this.urgency=urgency;
    }

	public Date getEventdate() {
		return eventdate;
	}

	public void setEventdate(Date eventdate) {
		this.eventdate = eventdate;
	}

    public List<User> getVolunteers(){
        return volunteers;
    }
    
    public void setVolunteers(List<User> volunteers){
        this.volunteers=volunteers;
    }

	public User getAdministrator() {
		return administrator;
	}

	public void setAdministrator(User administrator) {
		this.administrator = administrator;
	}
}