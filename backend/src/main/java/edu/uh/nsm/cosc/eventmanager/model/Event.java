package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Event implements Serializable{
    private static final long serialVersionUID=123456789;

    long id;

    @Size(min=1, max=100, message="Event name must be greater than one and less than 100")
    String name;

    @NotNull(message="Event description must not be null")
    String desc;

    @Size(min=1, max=100, message="Event address must be greater than 1 and less than 100 characters")
    String address;

    @Size(min=0, max=100, message="Event address2 must be less than 100")
    String address2;

    @Size(min=1, max=100, message="City must be greater than one and less than 100")
    String city;

    @Size(min=1, max=1, message="Must select a state")
    List<String> state;

    @Size(min=5, max=9, message="Zipcode must be between 5 and 9")
    String zipcode;

    @Size(min=1, message="Event skills must not be null")
    List<String> skills;

    @NotNull(message="Event urgency must not be null")
    List<String> urgency;
    
    @NotNull(message="Date must not be null")
    Date date;

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

    public String getDesc(){
        return desc;
    }

    public void setDesc(String desc){
        this.desc=desc;
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

    public List<String> getState(){
        return state;
    }

    public void setState(List<String> state){
        this.state=state;
    }

    public String getZipcode(){
        return zipcode;
    }

    public void setZipcode(String zipcode){
        this.zipcode=zipcode;
    }

    public List<String> getSkills(){
        return skills;
    }
    
    public void setSkills(List<String> skills){
        this.skills=skills;
    }

    public List<String> getUrgency(){
        return urgency;
    }

    public void setUrgency(List<String> urgency){
        this.urgency=urgency;
    }

    public Date getDate(){
        return date;
    }

    public void setDate(Date date){
        this.date=date;
    }
}