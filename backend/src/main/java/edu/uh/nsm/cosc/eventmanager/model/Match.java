package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Entity;
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

    @ManyToOne
    User volunteer;
    
    @ManyToOne
    Event event;
    
    @Transient
    boolean match;
    
    public long getId(){
        return id;
    }

    public void setId(long id){
        this.id = id;
    }

    public User getUser(){
        return volunteer;
    }

    public void setUser(User volunteer){
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

    public void setMatch(List<Skill> volSkills, List<Skill> evSkills){
        match = false;
        for (Skill volSkill : volSkills){
            for(Skill evSkill : evSkills){
                if (volSkill.equals(evSkill))
                  match=true;  
            }
        }
    }
}