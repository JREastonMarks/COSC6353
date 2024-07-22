package edu.uh.nsm.cosc.eventmanager.model;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;


@Entity
public class Notification implements Serializable {
	private static final long serialVersionUID = 4079829834776529782L;

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	
	@ManyToOne
	User receiver;
	
	@ManyToOne
	User sender;
	
	@Size(min=1, max=255, message="Tiltle must be greater than 1 and less than 255 characters")
	String title;
	
	@Size(min=1, max=255, message="Message must be greater than 1 and less than 255 characters")
	String message;
	
	Date date;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getReceiver() {
		return receiver;
	}

	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
