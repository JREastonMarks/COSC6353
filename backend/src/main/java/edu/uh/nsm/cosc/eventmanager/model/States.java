package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import jakarta.persistence.Column;

@Entity
public class States implements Serializable{
	private static final long serialVersionUID = 4660507372701940637L;
	
	@Id
	@Size(min=2, max=2, message="State code must be 2 characters")
	String code;
	
	@Column(unique = true)
	@Size(min=1, max=20, message="State name must be greater than 1 and less than 20 characters")
	String state;
	
	public String getCode() {
		return code;
	}
	
	public void setCode(String code) {
		this.code = code;
	}
	
	public String getState() {
		return state;
	}
	
	public void setState(String state) {
		this.state = state;
	}
}
