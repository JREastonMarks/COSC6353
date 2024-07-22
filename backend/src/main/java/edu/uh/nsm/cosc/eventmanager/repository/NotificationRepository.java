package edu.uh.nsm.cosc.eventmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.uh.nsm.cosc.eventmanager.model.Notification;
import edu.uh.nsm.cosc.eventmanager.model.User;


public interface NotificationRepository extends JpaRepository<Notification, Long> {
	
	List<Notification> findBySender(User sender);
	List<Notification> findByReceiver(User receiver);
}
