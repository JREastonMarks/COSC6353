package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.Notification;
import edu.uh.nsm.cosc.eventmanager.service.NotificationService;

@RestController
public class NotificationController {
	private NotificationService messageService;
	
	public NotificationController(NotificationService messageService) {
		this.messageService = messageService;
	}
	
	@GetMapping(path="/notifications")
	List<Notification> messages() {
		return messageService.getNotifications();
	}
	
	@GetMapping(path="/notification/{notificationId}")
	Notification message(@PathVariable(required=true) long notificationId) {
		return messageService.getNotification(notificationId);
	}
}
