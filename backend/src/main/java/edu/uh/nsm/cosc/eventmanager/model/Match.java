package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name="eventmatch")
public class Match implements Serializable{
    private static final long serialVersionUID = -8680941702456711825L;

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    long id;

    @ManyToOne(fetch=FetchType.EAGER)
    User volunteer;
    
    @ManyToOne(fetch=FetchType.EAGER)
    Event event;
    
    @Transient
    boolean match;
    
    private Integer rating;
    
    public long getId(){
        return id;
    }

    public void setId(long id){
        this.id = id;
    }

    public User getVolunteer(){
        return volunteer;
    }

    public void setVolunteer(User volunteer){
        this.volunteer = volunteer;
    }

    public Event getEvent(){
        return event;
    }    

    public void setEvent(Event event){
        this.event = event;
    }

    public boolean getMatch(){
        return match;
    }
    
    public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	
}