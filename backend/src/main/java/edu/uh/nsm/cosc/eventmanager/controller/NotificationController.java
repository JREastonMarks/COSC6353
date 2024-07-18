package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.Notification;
import edu.uh.nsm.cosc.eventmanager.service.NotificationService;

@RestController
@RequestMapping("/api")
public class NotificationController {
	private NotificationService notificationService;
	
	public NotificationController(NotificationService notificationService) {
		this.notificationService = notificationService;
	}
	
	@GetMapping(path="/notifications")
	List<Notification> messages() {
		return notificationService.getNotifications();
	}
	
	@GetMapping(path="/notification/{notificationId}")
	Notification message(@PathVariable(required=true) long notificationId) {
		return notificationService.getNotification(notificationId);
	}
}
