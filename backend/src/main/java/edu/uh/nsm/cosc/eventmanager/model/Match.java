package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;
import java.util.List;


public class Match implements Serializable{
    //private static final long serialVersionUID = ...;

    long id;
    User volunteer;
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