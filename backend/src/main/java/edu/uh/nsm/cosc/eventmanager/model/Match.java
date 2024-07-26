package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Match implements Serializable{
    //private static final long serialVersionUID = ...;

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    long id;

    @ManyToOne
    User volunteer;
    
    @ManyToMany
    Event event;
    
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

    public void setMatch(List<String> volSkills, List<String> evSkills){
        match = false;
        for (String volSkill : volSkills){
            for(String evSkill : evSkills){
                if (volSkill.equals(evSkill))
                  match=true;  
            }
        }
    }
}