package edu.uh.nsm.cosc.eventmanager.repository;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.Notification;
import edu.uh.nsm.cosc.eventmanager.model.User;


@Service
public class NotificationRepository {
	
	public List<Notification> findAllByUser(User user) {
		return new ArrayList<Notification>();
	}
	
	public List<Notification> findAll() {
		User sender = new User();
		sender.setFirstName("firstS");
		sender.setMiddleInitial("S");
		sender.setLastName("lastS");
		
		User receiver = new User();
		receiver.setFirstName("firstR");
		receiver.setMiddleInitial("R");
		receiver.setLastName("lastR");
		
		Notification notification = new Notification();
		notification.setId(1L);
		notification.setSender(sender);
		notification.setReceiver(receiver);
		notification.setTitle("Test Message");
		notification.setMessage("This is a test message");
		notification.setDate(Date.from(Instant.now()));
		
		List<Notification> notifications = new ArrayList<>();
		notifications.add(notification);
		return notifications;
	}
	
	public Notification findNotificationById(long id) {
		User sender = new User();
		sender.setFirstName("firstS");
		sender.setMiddleInitial("S");
		sender.setLastName("lastS");
		
		User receiver = new User();
		receiver.setFirstName("firstR");
		receiver.setMiddleInitial("R");
		receiver.setLastName("lastR");
		
		Notification notification = new Notification();
		notification.setId(1L);
		notification.setSender(sender);
		notification.setReceiver(receiver);
		notification.setTitle("Test Message");
		notification.setMessage("This is a test message");
		notification.setDate(Date.from(Instant.now()));
		
		return notification;
	}
}
