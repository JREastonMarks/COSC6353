package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;

@Entity
public class History implements Serializable {

	private static final long serialVersionUID = 8335607704576439229L;
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    long id;

    @ManyToOne
    User volunteer;

    @ManyToOne
    Event event;

    @Size(min=1, max=50, message="Participation status must be greater than 1 and less than 50 characters")
    String status;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getVolunteer() {
        return volunteer;
    }

    public void setVolunteer(User volunteer) {
        this.volunteer = volunteer;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
}
