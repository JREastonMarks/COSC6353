package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;

@Entity
public class Skill implements Serializable{
	private static final long serialVersionUID = 4383259057174209407L;

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
	
	public Skill() {
		
	}
	
	public Skill(String name) {
		this.name = name;
	}
	
	@Size(min=1, max=100, message="Skill name must be greater than one and less than 100")
	String name;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
