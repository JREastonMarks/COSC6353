package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.Notification;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.service.NotificationService;
import edu.uh.nsm.cosc.eventmanager.service.UserService;

@RestController
@RequestMapping("/api")
public class NotificationController {
	private NotificationService notificationService;
	private UserService userService;
	
	public NotificationController(UserService userService, NotificationService notificationService) {
		this.notificationService = notificationService;
		this.userService = userService;
	}
	
	@GetMapping(path="/notifications")
	List<Notification> messages(@AuthenticationPrincipal UserDetails userDetails) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		return notificationService.getNotifications(user);
	}
	
	@GetMapping(path="/notification/{notificationId}")
	Notification message(@PathVariable(required=true) long notificationId) {
		return notificationService.getNotification(notificationId);
	}
	
	@PostMapping(path="/notification")
	void createNotification(Notification notification) {
		notificationService.createNotification(notification);
	}
	
}
