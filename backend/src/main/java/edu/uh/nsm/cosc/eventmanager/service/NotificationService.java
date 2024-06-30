package edu.uh.nsm.cosc.eventmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.Notification;
import edu.uh.nsm.cosc.eventmanager.repository.NotificationRepository;

@Service
public class NotificationService {
	private NotificationRepository notificationRepository;
	
	public NotificationService(NotificationRepository notificationRepository) {
		this.notificationRepository = notificationRepository;
	}
	

	public List<Notification> getNotifications() {
		return notificationRepository.findAll();
	}

	public Notification getNotification(long notificationId) {
		return notificationRepository.findNotificationById(notificationId);
	}

}
